import { EventEmitter } from "stream";
import { KeyedExecutor } from "./utils/KeyedExecutor";
import { Subscription } from "./models/Subscription";
import { Index } from "./models/Index";
import { Timestamp } from "./models/Timestamp";
import { RetryAlgorithm } from "./retry/RetryAlgorithm";
import { Timer } from "./utils/Timer";
import { ExponentialBackOff } from "./retry/ExponentialBackOff";
import { Topic } from "./models/Topic";
import { RetryLimitExceededException } from "./exception/RetryLimitExceededException";

import { EventID } from "./models/EventID";
import { EntityID } from "./models/EntityID";
import { FailureEvent } from "./models/FailureEvent";
import { SubscriptionType } from "./models/SubscriptionType";
import { Event } from "./models/Event";
import { SortedMap } from "./sorted-map";

export class EventBus extends EventEmitter {
  private readonly executor: KeyedExecutor;
  private readonly buses: Map<string, Event[]>;
  private readonly subscriptions: Map<string, Set<Subscription>>;
  private readonly subscriberIndexes: Map<string, Map<string, Index>>;
  private readonly eventIndex: Map<string, Map<string, Index>>;
  private readonly timestampIndex: Map<string, SortedMap<Timestamp, Index>>;
  private readonly retryAlgorithm: RetryAlgorithm<Event, void>;
  private readonly deadLetterQueue: EventBus | null;
  private readonly timer: Timer;

  constructor(
    threads: number = 4,
    retryAlgorithm: RetryAlgorithm<Event, void> = new ExponentialBackOff(3),
    deadLetterQueue: EventBus | null = null,
    timer: Timer = new Timer()
  ) {
    super();
    this.retryAlgorithm = retryAlgorithm;
    this.deadLetterQueue = deadLetterQueue;
    this.timer = timer;
    this.buses = new Map();
    this.executor = new KeyedExecutor(threads);
    this.subscriptions = new Map();
    this.subscriberIndexes = new Map();
    this.timestampIndex = new Map();
    this.eventIndex = new Map();
  }

  public async publish(topic: Topic, event: Event): Promise<void> {
    return this.executor.submit(topic.getName(), async () => {
      this.addEventToBus(topic, event);
    });
  }

  private addEventToBus(topic: Topic, event: Event): void {
    if (!this.buses.has(topic.getName())) {
      this.registerTopic(topic);
    }

    const bus = this.buses.get(topic.getName())!;
    const currentIndex = new Index(bus.length);

    // Update timestamp index using SortedMap
    let timestampMap = this.timestampIndex.get(topic.getName());
    if (!timestampMap) {
      timestampMap = new SortedMap<Timestamp, Index>((a, b) => a.compareTo(b));
      this.timestampIndex.set(topic.getName(), timestampMap);
    }
    timestampMap.set(event.getTimestamp(), currentIndex);

    // Update other indexes
    this.eventIndex
      .get(topic.getName())!
      .set(event.getId().toString(), currentIndex);
    bus.push(event);

    const subs = this.subscriptions.get(topic.getName()) || new Set();
    for (const subscription of subs) {
      if (subscription.getType() === SubscriptionType.PUSH) {
        this.push(event, subscription);
      }
    }
  }

  public async poll(topic: Topic, subscriber: EntityID): Promise<Event | null> {
    return this.executor.get(topic.getName() + subscriber.getId(), async () => {
      const indexMap = this.subscriberIndexes.get(topic.getName());
      if (!indexMap) return null;

      const index = indexMap.get(subscriber.getId());
      if (!index) return null;

      try {
        const event = this.buses.get(topic.getName())![index.getVal()];
        indexMap.set(subscriber.getId(), index.increment());
        return event;
      } catch (e) {
        return null;
      }
    });
  }

  private push(event: Event, subscription: Subscription): void {
    this.executor.submit(
      subscription.getTopicId().getName() +
        subscription.getSubscriberId().getId(),
      async () => {
        try {
          await this.retryAlgorithm.attempt(
            subscription.getHandler(),
            event,
            0
          );
        } catch (e) {
          if (e instanceof RetryLimitExceededException) {
            if (this.deadLetterQueue) {
              await this.deadLetterQueue.publish(
                subscription.getTopicId(),
                new FailureEvent(event, e, this.timer.getTime())
              );
            } else {
              console.error(e);
            }
          }
        }
      }
    );
  }

  public registerTopic(topic: Topic): void {
    this.buses.set(topic.getName(), []);
    this.subscriptions.set(topic.getName(), new Set());
    this.subscriberIndexes.set(topic.getName(), new Map());
    this.timestampIndex.set(
      topic.getName(),
      new SortedMap<Timestamp, Index>((a, b) => a.compareTo(b))
    );
    this.eventIndex.set(topic.getName(), new Map());
  }

  public async subscribe(subscription: Subscription): Promise<void> {
    return this.executor.submit(
      subscription.getTopicId().getName(),
      async () => {
        const topicId = subscription.getTopicId();
        if (!this.subscriptions.has(topicId.getName())) {
          this.registerTopic(topicId);
        }
        this.subscriptions.get(topicId.getName())!.add(subscription);
        this.subscriberIndexes
          .get(topicId.getName())!
          .set(
            subscription.getSubscriberId().getId(),
            new Index(this.buses.get(topicId.getName())!.length)
          );
      }
    );
  }

  public async setIndexAfterTimestamp(
    topic: Topic,
    subscriber: EntityID,
    timestamp: Timestamp
  ): Promise<void> {
    return this.executor.submit(
      topic.getName() + subscriber.getId(),
      async () => {
        const timestampMap = this.timestampIndex.get(topic.getName())!;

        const higherEntry = timestampMap.higherEntry(timestamp);

        if (!higherEntry) {
          this.subscriberIndexes
            .get(topic.getName())!
            .set(
              subscriber.getId(),
              new Index(this.buses.get(topic.getName())!.length)
            );
        } else {
          this.subscriberIndexes
            .get(topic.getName())!
            .set(subscriber.getId(), higherEntry.value);
        }
      }
    );
  }

  public async setIndexAfterEvent(
    topic: Topic,
    subscriber: EntityID,
    eventId: EventID
  ): Promise<void> {
    return this.executor.submit(
      topic.getName() + subscriber.getId(),
      async () => {
        const eIndex = this.eventIndex
          .get(topic.getName())!
          .get(eventId.toString());
        if (eIndex) {
          this.subscriberIndexes
            .get(topic.getName())!
            .set(subscriber.getId(), eIndex.increment());
        }
      }
    );
  }

  public async getEvent(topic: Topic, eventId: EventID): Promise<Event | null> {
    return this.executor.get(topic.getName(), async () => {
      const index = this.eventIndex
        .get(topic.getName())
        ?.get(eventId.toString());
      if (index === undefined) return null;
      return this.buses.get(topic.getName())?.[index.getVal()] || null;
    });
  }
}

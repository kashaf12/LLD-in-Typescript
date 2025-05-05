import { EventBus } from "../src/EventBus";
import { EntityID } from "../src/models/EntityID";
import { Event } from "../src/models/Event";
import { EventID } from "../src/models/EventID";
import { Timestamp } from "../src/models/Timestamp";
import { Topic } from "../src/models/Topic";
import { ExponentialBackOff } from "../src/retry/ExponentialBackOff";
import { SortedMap } from "../src/sorted-map";
import { Timer } from "../src/utils/Timer";

describe("SortedMap", () => {
  test("should maintain entries in sorted order", () => {
    const map = new SortedMap<number, string>((a, b) => a - b);
    map.set(3, "three");
    map.set(1, "one");
    map.set(2, "two");

    expect(map.keysArray()).toEqual([1, 2, 3]);
    expect(map.valuesArray()).toEqual(["one", "two", "three"]);
  });

  test("should find higher entry correctly", () => {
    const map = new SortedMap<number, string>((a, b) => a - b);
    map.set(1, "one");
    map.set(3, "three");
    map.set(5, "five");

    const higher = map.higherEntry(2);
    expect(higher?.key).toBe(3);
    expect(higher?.value).toBe("three");

    const higherNonExistent = map.higherEntry(5);
    expect(higherNonExistent).toBeUndefined();
  });

  test("should handle custom comparators", () => {
    const map = new SortedMap<string, number>((a, b) => b.localeCompare(a));
    map.set("c", 3);
    map.set("a", 1);
    map.set("b", 2);

    expect(map.keysArray()).toEqual(["c", "b", "a"]);
  });
});

describe("EventBus with SortedMap", () => {
  let eventBus: EventBus;
  const timer = new Timer();
  const testTopic = new Topic("test-topic");
  const testSubscriber = new EntityID("test-subscriber");

  beforeEach(() => {
    eventBus = new EventBus(2, new ExponentialBackOff(3), null, timer);
    eventBus.registerTopic(testTopic);
  });

  test("should maintain timestamp ordering", async () => {
    const earlyEvent = new Event(
      new EventID(),
      "early",
      {},
      new Timestamp(new Date(2023, 0, 1))
    );
    const lateEvent = new Event(
      new EventID(),
      "late",
      {},
      new Timestamp(new Date(2023, 0, 2))
    );

    // Publish out of order
    await eventBus.publish(testTopic, lateEvent);
    await eventBus.publish(testTopic, earlyEvent);

    // Verify ordering in timestamp index
    const timestampMap = eventBus["timestampIndex"].get(testTopic.getName())!;
    const entries = timestampMap.entriesArray();
    expect(entries[0].key.val).toEqual(new Date(2023, 0, 1));
    expect(entries[1].key.val).toEqual(new Date(2023, 0, 2));
  });

  test("should correctly find events after timestamp", async () => {
    const events = [
      new Event(
        new EventID(),
        "event-1",
        {},
        new Timestamp(new Date(2023, 0, 1))
      ),
      new Event(
        new EventID(),
        "event-2",
        {},
        new Timestamp(new Date(2023, 0, 2))
      ),
      new Event(
        new EventID(),
        "event-3",
        {},
        new Timestamp(new Date(2023, 0, 3))
      ),
    ];

    for (const event of events) {
      await eventBus.publish(testTopic, event);
    }

    // Set index to after the second event
    await eventBus.setIndexAfterTimestamp(
      testTopic,
      testSubscriber,
      new Timestamp(new Date(2023, 0, 2))
    );

    const polledEvent = await eventBus.poll(testTopic, testSubscriber);
    expect(polledEvent?.getName()).toBe("event-3");
  });

  test("should handle concurrent modifications", async () => {
    const publishPromises = [];
    for (let i = 0; i < 100; i++) {
      publishPromises.push(
        eventBus.publish(
          testTopic,
          new Event(new EventID(), `event-${i}`, {}, timer.getTime())
        )
      );
    }

    await Promise.all(publishPromises);
    const bus = eventBus["buses"].get(testTopic.getName())!;
    expect(bus.length).toBe(100);
  });
});

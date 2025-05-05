import { EntityID } from "./EntityID";
import { Event } from "./Event";
import { SubscriptionType } from "./SubscriptionType";
import { Topic } from "./Topic";

export class Subscription {
  constructor(
    private readonly topicId: Topic,
    private readonly subscriberId: EntityID,
    private readonly type: SubscriptionType,
    private readonly precondition: (event: Event) => boolean,
    private readonly handler: (event: Event) => Promise<void>
  ) {}

  public getHandler(): (event: Event) => Promise<void> {
    return this.handler;
  }
  public getType(): SubscriptionType {
    return this.type;
  }
  public getTopicId(): Topic {
    return this.topicId;
  }
  public getSubscriberId(): EntityID {
    return this.subscriberId;
  }
}

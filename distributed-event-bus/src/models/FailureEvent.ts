import { Event } from "./Event";
import { EventID } from "./EventID";
import { Timestamp } from "./Timestamp";

export class FailureEvent extends Event {
  constructor(
    event: Event,
    private readonly error: Error,
    private readonly failureTimestamp: Timestamp
  ) {
    super(
      new EventID(),
      event.getName(),
      event.getAttributes(),
      event.getTimestamp()
    );
  }
}

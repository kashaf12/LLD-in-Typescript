import { EventID } from "./EventID";
import { Timestamp } from "./Timestamp";

export class Event {
  constructor(
    private readonly id: EventID,
    private readonly name: string,
    private readonly attributes: Record<string, string>,
    private readonly timestamp: Timestamp
  ) {}

  public getId(): EventID {
    return this.id;
  }
  public getTimestamp(): Timestamp {
    return this.timestamp;
  }
  public getName(): string {
    return this.name;
  }
  public getAttributes(): Record<string, string> {
    return this.attributes;
  }
  public toString(): string {
    return `Event{id=${this.id}}`;
  }
}

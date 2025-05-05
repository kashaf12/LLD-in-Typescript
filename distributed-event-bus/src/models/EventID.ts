import { v4 as uuidv4 } from "uuid";

export class EventID {
  constructor(private readonly id: string = uuidv4()) {}
  public toString(): string {
    return this.id;
  }
}

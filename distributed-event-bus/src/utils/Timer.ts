import { Timestamp } from "../models/Timestamp";

export class Timer {
  public getTime(): Timestamp {
    return new Timestamp();
  }
}

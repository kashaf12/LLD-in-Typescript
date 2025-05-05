import { compareAsc } from "date-fns";

export class Timestamp {
  constructor(public readonly val: Date = new Date()) {}
  public compareTo(other: Timestamp): number {
    return compareAsc(this.val, other.val);
  }
}

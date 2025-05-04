import { AccessDetails } from "./AccessDetails";

export class Record<TValue> {
  private value: TValue;
  private loadTime: number;
  private accessDetails: AccessDetails;

  constructor(
    value: TValue,
    accessDetails: AccessDetails = new AccessDetails(),
    loadTime = 0
  ) {
    this.value = value;
    this.accessDetails = accessDetails;
    this.loadTime = loadTime;
  }

  public getAccessDetails() {
    return this.accessDetails;
  }

  public getValue() {
    return this.value;
  }

  public getLoadTime() {
    return this.loadTime;
  }
}

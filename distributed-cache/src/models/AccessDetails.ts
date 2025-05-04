export class AccessDetails {
  private accessCount: number;
  private lastAccessTime: number;

  constructor(lastAccessTime = Date.now()) {
    this.accessCount = 0;
    this.lastAccessTime = lastAccessTime;
  }

  public getLastAccessTime() {
    return this.lastAccessTime;
  }

  public getAccessCount() {
    return this.accessCount;
  }
}

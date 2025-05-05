export class Index {
  constructor(public val: number) {}
  public increment(): Index {
    return new Index(this.val + 1);
  }
  public getVal(): number {
    return this.val;
  }
}

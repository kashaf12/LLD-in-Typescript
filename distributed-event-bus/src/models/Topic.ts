export class Topic {
  constructor(private readonly name: string) {}
  public getName(): string {
    return this.name;
  }
  public toString(): string {
    return this.name;
  }
}

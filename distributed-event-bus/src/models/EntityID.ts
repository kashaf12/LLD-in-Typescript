export class EntityID {
  constructor(private readonly id: string) {}
  public getId(): string {
    return this.id;
  }
}

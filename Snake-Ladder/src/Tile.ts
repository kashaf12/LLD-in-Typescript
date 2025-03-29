export class Tile {
  private readonly number: number;

  constructor(number: number) {
    this.number = number;
  }

  public getTileNumber(): number {
    return this.number;
  }
}

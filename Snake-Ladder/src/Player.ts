import { Tile } from "./Tile";

export class Player {
  name: string;
  private currentTile: Tile;

  constructor(name: string, startTile: Tile) {
    this.name = name;
    this.currentTile = startTile;
  }

  public getCurrentTile() {
    return this.currentTile;
  }

  public getName(): string {
    return this.name;
  }

  public setCurrentTile(tile: Tile) {
    this.currentTile = tile;
  }
}

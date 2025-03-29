import { Tile } from "./Tile";
import { TileFactory } from "./TileFactory";

export class Board {
  private size: number;
  private tiles: Tile[];
  private snakes: Map<Tile, Tile> = new Map();
  private ladders: Map<Tile, Tile> = new Map();

  constructor(size = 10) {
    this.size = size;
    this.tiles = [];
    this.createTiles();
  }

  public getSize(): number {
    return this.size;
  }

  private createTiles() {
    this.tiles = Array.from({ length: this.size }, (_, i) =>
      TileFactory.createTile(i + 1)
    );
  }

  public getSnakes() {
    return this.snakes;
  }

  public getLadders() {
    return this.ladders;
  }

  public addSnake(startTile: Tile, endTile: Tile) {
    this.snakes.set(startTile, endTile);
  }

  public addLadder(startTile: Tile, endTile: Tile) {
    this.ladders.set(startTile, endTile);
  }

  public getTile(tileNumber: number): Tile {
    return this.tiles[tileNumber - 1];
  }

  public getTiles(): Tile[] {
    return this.tiles;
  }
}

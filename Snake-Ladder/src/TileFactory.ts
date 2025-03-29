import { Tile } from "./Tile";

export class TileFactory {
  public static createTile(tileNumber: number) {
    return new Tile(tileNumber);
  }
}

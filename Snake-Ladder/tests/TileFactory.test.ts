import { Tile } from "../src/Tile";
import { TileFactory } from "../src/TileFactory";

describe("TileFactory", () => {
  it("should create a tile with the given number", () => {
    const tileNumber = 1;
    const tile = TileFactory.createTile(tileNumber);
    expect(tile).toBeInstanceOf(Tile);
    expect(tile.getTileNumber()).toBe(tileNumber);
  });

  it("should create tiles with unique numbers", () => {
    const tile1 = TileFactory.createTile(1);
    const tile2 = TileFactory.createTile(2);
    expect(tile1.getTileNumber()).not.toBe(tile2.getTileNumber());
  });
});

import { Tile } from "../src/Tile";

describe("Tile", () => {
  it("should create a tile with the given number", () => {
    const tileNumber = 5;
    const tile = new Tile(tileNumber);
    expect(tile).toBeInstanceOf(Tile);
    expect(tile.getTileNumber()).toBe(tileNumber);
  });
});

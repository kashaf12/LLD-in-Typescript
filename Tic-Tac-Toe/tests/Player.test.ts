import { CellX } from "../src/CellX";
import { CellY } from "../src/CellY";
import { Player } from "../src/Player";

describe("Player", () => {
  it("should create a Player instance with the correct symbol", () => {
    const cellX = new CellX();
    const cellY = new CellY();

    const playerX = new Player("test 1", cellX);
    expect(playerX.getCell()).toBe(cellX);

    const playerY = new Player("test 2", cellY);
    expect(playerY.getCell()).toBe(cellY);
  });
});

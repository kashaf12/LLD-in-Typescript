import { CellType } from "../src/Cell";
import { CellFactory } from "../src/CellFactory";
import { Player } from "../src/Player";

describe("Player", () => {
  it("should create a Player instance with the correct symbol", () => {
    const cellX = CellFactory.createCell(CellType.X);
    const cellY = CellFactory.createCell(CellType.Y);

    const playerX = new Player("test 1", cellX);
    expect(playerX.getCell()).toBe(cellX);

    const playerY = new Player("test 2", cellY);
    expect(playerY.getCell()).toBe(cellY);
  });
});

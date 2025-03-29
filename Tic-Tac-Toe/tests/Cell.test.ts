import { CellType } from "../src/Cell";
import { CellFactory } from "../src/CellFactory";

describe("Cell", () => {
  it("should create a CellX instance with type X", () => {
    const cellX = CellFactory.createCell(CellType.X);
    expect(cellX.getCellType()).toBe("X");
  });

  it("should create a CellY instance with type O", () => {
    const cellY = CellFactory.createCell(CellType.Y);
    expect(cellY.getCellType()).toBe("Y");
  });
});

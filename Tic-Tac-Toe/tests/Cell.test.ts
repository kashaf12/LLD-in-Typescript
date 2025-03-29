import { CellX } from "../src/CellX";
import { CellY } from "../src/CellY";

describe("Cell", () => {
  it("should create a CellX instance with type X", () => {
    const cellX = new CellX();
    expect(cellX.getCellType()).toBe("X");
  });

  it("should create a CellY instance with type O", () => {
    const cellY = new CellY();
    expect(cellY.getCellType()).toBe("Y");
  });
});

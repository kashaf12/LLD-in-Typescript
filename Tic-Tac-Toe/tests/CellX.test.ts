import { CellX } from "../src/CellX";

describe("CellX", () => {
  it("should create a CellX instance with type X", () => {
    const cellX = new CellX();
    expect(cellX.getCellType()).toBe("X");
  });
});

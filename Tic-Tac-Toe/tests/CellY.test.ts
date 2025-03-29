import { CellY } from "../src/CellY";

describe("CellY", () => {
  it("should create a CellY instance with type Y", () => {
    const cellY = new CellY();
    expect(cellY.getCellType()).toBe("Y");
  });
});

import { Cell, CellType } from "../src/Cell";
import { CellFactory } from "../src/CellFactory";

describe("CellFactory", () => {
  it("should create a CellX instance when given CellType.X", () => {
    const cell = CellFactory.createCell(CellType.X);
    expect(cell).toBeInstanceOf(Cell);
    expect(cell.getCellType()).toBe(CellType.X);
  });

  it("should create a CellY instance when given CellType.Y", () => {
    const cell = CellFactory.createCell(CellType.Y);
    expect(cell).toBeInstanceOf(Cell);
    expect(cell.getCellType()).toBe(CellType.Y);
  });

  it("should create a CellX instance when given 'X' symbol", () => {
    const cell = CellFactory.createCellFromSymbol("X");
    expect(cell).toBeInstanceOf(Cell);
    expect(cell.getCellType()).toBe(CellType.X);
  });

  it("should create a CellY instance when given 'Y' symbol", () => {
    const cell = CellFactory.createCellFromSymbol("Y");
    expect(cell).toBeInstanceOf(Cell);
    expect(cell.getCellType()).toBe(CellType.Y);
  });

  it("should handle lowercase symbols", () => {
    const cellX = CellFactory.createCellFromSymbol("x");
    const cellY = CellFactory.createCellFromSymbol("y");

    expect(cellX).toBeInstanceOf(Cell);
    expect(cellY).toBeInstanceOf(Cell);
  });

  it("should throw an error for invalid cell type", () => {
    // Using any to bypass TypeScript's type checking for testing purposes
    expect(() => {
      CellFactory.createCell("Z" as any);
    }).toThrow("Invalid cell type");
  });

  it("should throw an error for invalid symbol", () => {
    expect(() => {
      CellFactory.createCellFromSymbol("Z");
    }).toThrow("Invalid cell symbol");
  });
});

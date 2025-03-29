import { Cell, CellType } from "./Cell";

export class CellFactory {
  public static createCell(type: CellType): Cell {
    switch (type) {
      case CellType.X:
        return new Cell(CellType.X);
      case CellType.Y:
        return new Cell(CellType.Y);
      default:
        throw new Error(`Invalid cell type: ${type}`);
    }
  }

  public static createCellFromSymbol(symbol: string): Cell {
    switch (symbol.toUpperCase()) {
      case "X":
        return new Cell(CellType.X);
      case "Y":
        return new Cell(CellType.Y);
      default:
        throw new Error(`Invalid cell symbol: ${symbol}`);
    }
  }
}

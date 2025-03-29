import { Cell, CellType } from "./Cell";
import { CellX } from "./CellX";
import { CellY } from "./CellY";

export class CellFactory {
  public static createCell(type: CellType): Cell {
    switch (type) {
      case CellType.X:
        return new CellX();
      case CellType.Y:
        return new CellY();
      default:
        throw new Error(`Invalid cell type: ${type}`);
    }
  }

  public static createCellFromSymbol(symbol: string): Cell {
    switch (symbol.toUpperCase()) {
      case "X":
        return new CellX();
      case "Y":
        return new CellY();
      default:
        throw new Error(`Invalid cell symbol: ${symbol}`);
    }
  }
}

export enum CellType {
  X = "X",
  Y = "Y",
}

export class Cell {
  private cellType: CellType;

  constructor(cellType: CellType) {
    this.cellType = cellType;
  }

  public getCellType(): CellType {
    return this.cellType;
  }
}

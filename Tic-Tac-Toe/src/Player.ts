import { Cell } from "./Cell";

export class Player {
  private name: string;
  private cell: Cell;

  constructor(name: string, cell: Cell) {
    this.name = name;
    this.cell = cell;
  }

  public getName(): string {
    return this.name;
  }
  public getCell(): Cell {
    return this.cell;
  }
}

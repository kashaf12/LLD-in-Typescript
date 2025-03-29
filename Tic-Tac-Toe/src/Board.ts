import { Cell } from "./Cell";
import { Player } from "./Player";

export class Board {
  private size: number;
  private board: (Cell | null)[][];

  constructor(size: number) {
    this.size = size;
    this.board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );
  }

  public getSize(): number {
    return this.size;
  }

  public printBoard(): void {
    console.log(
      this.board
        .map((row) =>
          row.map((cell) => (cell ? cell.getCellType() : "_")).join(" ")
        )
        .join("\n")
    );
  }

  public makeMove(player: Player, x: number, y: number): boolean {
    if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
      console.log("Invalid move! Out of bounds.");
      return false;
    }
    if (this.board[x][y] !== null) {
      console.log("Cell already occupied! Try again.");
      return false;
    }
    this.board[x][y] = player.getCell();
    return true;
  }

  public hasEmptyCells(): boolean {
    return this.board.some((row) => row.some((cell) => cell === null));
  }

  public getBoard() {
    return this.board;
  }
}

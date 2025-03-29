import { Board } from "./Board";
import { Player } from "./Player";
import { WinningStrategyI } from "./WinningStrategyI";

export class BasicStrategy implements WinningStrategyI {
  private board: Board | null = null;

  public setBoard(board: Board): void {
    this.board = board;
  }

  public checkWinner(player: Player): boolean {
    if (!this.board) {
      throw new Error("Board is not set.");
    }
    const cellType = player.getCell().getCellType();
    const board = this.board.getBoard();
    const size = this.board.getSize();

    // Check rows
    for (let i = 0; i < size; i++) {
      if (board[i].every((cell) => cell?.getCellType() === cellType)) {
        return true;
      }
    }

    // Check columns
    for (let j = 0; j < size; j++) {
      if (board.every((row) => row[j]?.getCellType() === cellType)) {
        return true;
      }
    }

    // Check diagonals
    if (board.every((row, index) => row[index]?.getCellType() === cellType)) {
      return true;
    }
    if (
      board.every(
        (row, index) => row[size - 1 - index]?.getCellType() === cellType
      )
    ) {
      return true;
    }

    return false;
  }
}

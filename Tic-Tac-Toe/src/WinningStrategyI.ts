import { Board } from "./Board";
import { Player } from "./Player";

export interface WinningStrategyI {
  checkWinner(player: Player): boolean;
  setBoard(board: Board): void;
}

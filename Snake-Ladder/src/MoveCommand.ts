import { Board } from "./Board";
import { CommandI } from "./CommandI";
import { Game } from "./Game";
import { Player } from "./Player";
import { Tile } from "./Tile";

export class MoveCommand implements CommandI {
  private player: Player;
  private game: Game;
  private board: Board;
  private steps: number;
  private previousTile: Tile | null = null;

  constructor(game: Game, player: Player, board: Board, steps: number) {
    this.player = player;
    this.board = board;
    this.steps = steps;
    this.game = game;
  }

  execute(): void {
    this.previousTile = this.player.getCurrentTile();

    let newPosition = this.previousTile.getTileNumber() + this.steps;

    if (newPosition > this.board.getSize()) {
      return;
    }

    const targetTile = this.board.getTile(newPosition);

    if (this.board.getSnakes().has(targetTile)) {
      const snakeTail = this.board.getSnakes().get(targetTile);
      if (snakeTail) {
        this.game.fireEvent("snake", {
          player: this.player,
          from: targetTile,
          to: snakeTail,
        });
        newPosition = snakeTail.getTileNumber();
      }
    } else if (this.board.getLadders().has(targetTile)) {
      const ladderTop = this.board.getLadders().get(targetTile);
      if (ladderTop) {
        this.game.fireEvent("ladder", {
          player: this.player,
          from: targetTile,
          to: ladderTop,
        });
        newPosition = ladderTop.getTileNumber();
      }
    }

    this.player.setCurrentTile(this.board.getTile(newPosition));

    this.game.fireEvent("moveCompleted", {
      player: this.player,
      from: this.previousTile,
      to: this.board.getTile(newPosition),
      steps: this.steps,
    });
  }

  undo(): void {
    if (this.previousTile) {
      this.game.fireEvent("moveUndone", {
        player: this.player,
        from: this.player.getCurrentTile(),
        to: this.previousTile,
      });

      this.player.setCurrentTile(this.previousTile);
    }
  }
}

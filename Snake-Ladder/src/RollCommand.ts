import { CommandI } from "./CommandI";
import { DiceI } from "./DiceI";
import { Game } from "./Game";
import { MoveCommand } from "./MoveCommand";
import { Player } from "./Player";

export class RollDiceCommand implements CommandI {
  private game: Game;
  private player: Player;
  private diceStrategy: DiceI;
  private result: number = 0;
  private moveCommand: MoveCommand | null = null;

  constructor(game: Game, player: Player, diceStrategy: DiceI) {
    this.game = game;
    this.player = player;
    this.diceStrategy = diceStrategy;
  }

  execute(): void {
    this.result = this.diceStrategy.roll();

    this.game.fireEvent("diceRolled", {
      player: this.player,
      result: this.result,
    });

    this.moveCommand = new MoveCommand(
      this.game,
      this.player,
      this.game.getBoard(),
      this.result
    );
    this.moveCommand.execute();

    if (
      this.player.getCurrentTile().getTileNumber() ===
      this.game.getBoard().getSize()
    ) {
      this.game.fireEvent("gameWon", {
        player: this.player,
      });
    }
  }

  undo(): void {
    if (this.moveCommand) {
      this.moveCommand.undo();
    }
  }
}

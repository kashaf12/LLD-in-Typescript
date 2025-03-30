import { Game } from "./Game";
import { Player } from "./Player";
import { Tile } from "./Tile";

export class GameController {
  private game: Game;

  constructor(game: Game) {
    this.game = game;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    // Listen to game events and update UI accordingly
    this.game.addEventListener("gameStarted", (data) => {
      console.log("===== GAME STARTED =====");
      console.log("Players: ");
      data.players.forEach((player: Player) => {
        console.log(
          `Name: ${player.getName()}, Starting Position: ${player
            .getCurrentTile()
            .getTileNumber()}`
        );
      });
      console.log("Board size: " + data.board.getSize());
      console.log("Snakes: ");
      data.board.getSnakes().forEach((value: Tile, key: Tile) => {
        console.log(`From ${key.getTileNumber()} to ${value.getTileNumber()}`);
      });
      console.log("Ladders: ");
      data.board.getLadders().forEach((value: Tile, key: Tile) => {
        console.log(`From ${key.getTileNumber()} to ${value.getTileNumber()}`);
      });
      console.log("=========================");
    });

    this.game.addEventListener("turnStarted", (data) => {
      console.log(`\n${data.player.getName()}'s turn!`);
      console.log(
        `Current position: ${data.player.getCurrentTile().getTileNumber()}`
      );
    });

    this.game.addEventListener("gameWon", (data) => {
      console.log(
        `\n🎉 CONGRATULATIONS! ${data.player.getName()} has won the game! 🎉`
      );
    });
  }

  public startGame(): void {
    this.game.play();
  }

  public undoLastMove(): void {
    this.game.undoLastMove();
  }
}

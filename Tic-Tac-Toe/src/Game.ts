import { Board } from "./Board";
import { Player } from "./Player";
import readline from "node:readline";
import { WinningStrategyI } from "./WinningStrategyI";
import { BasicStrategy } from "./BasicStrategy";

export class Game {
  private gameBoard: Board;
  private players: Player[];
  private winningStrategy: WinningStrategyI;
  private currentPlayerIndex: number = 0;

  private static rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  constructor(
    players: Player[],
    size = 3,
    winningStrategy: WinningStrategyI = new BasicStrategy()
  ) {
    if (players.length < 2) {
      throw new Error("At least two players are required to play the game.");
    }
    this.gameBoard = new Board(size);
    this.players = players;
    winningStrategy.setBoard(this.gameBoard);
    this.winningStrategy = winningStrategy;
  }

  async startGame(): Promise<void> {
    console.log("Game started!");
    this.gameBoard.printBoard();

    while (this.gameBoard.hasEmptyCells()) {
      const player = this.players[this.currentPlayerIndex];
      console.log(
        `\n${player.getName()}'s turn (${player.getCell().getCellType()})`
      );

      const { x, y } = await Game.getMoveFromUser();
      if (!this.gameBoard.makeMove(player, x, y)) continue;

      this.gameBoard.printBoard();

      if (this.winningStrategy.checkWinner(player)) {
        console.log(`\n🎉 ${player.getName()} wins!`);
        Game.rl.close();
        return;
      }

      this.currentPlayerIndex =
        (this.currentPlayerIndex + 1) % this.players.length;
    }

    console.log("\nIt's a draw!");
    Game.rl.close();
  }
  static getMoveFromUser(): Promise<{ x: number; y: number }> {
    return new Promise((resolve) => {
      Game.rl.question("Enter your move (row col): ", (answer) => {
        const [x, y] = answer.split(" ").map(Number);
        resolve({ x, y });
      });
    });
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public getBoardSize() {
    return this.gameBoard.getSize();
  }
}

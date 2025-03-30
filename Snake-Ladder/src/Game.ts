import { Board } from "./Board";
import { CommandHistory } from "./CommandHistory";
import { NormalDice } from "./Dice";
import { DiceI } from "./DiceI";
import { EventEmitter } from "./EventEmitter";
import { Player } from "./Player";
import { RollDiceCommand } from "./RollCommand";

export class Game extends EventEmitter {
  private players: Player[];
  private currentPlayerIndex: number;
  private diceStrategy: DiceI;
  private board: Board;
  private commandHistory: CommandHistory;
  private gameOver: boolean = false;

  constructor(
    board: Board,
    players: Player[],
    diceStrategy: DiceI = new NormalDice(6)
  ) {
    super();
    this.players = players;
    this.board = board;
    this.currentPlayerIndex = 0;
    this.diceStrategy = diceStrategy;
    this.commandHistory = new CommandHistory();

    this.addEventListener("gameWon", (data) => {
      this.gameOver = true;
      console.log(`Player ${data.player.getName()} wins!`);
    });
  }

  public getBoard(): Board {
    return this.board;
  }

  public getPlayers(): Player[] {
    return this.players;
  }
  public getDiceStrategy(): DiceI {
    return this.diceStrategy;
  }
  public setDiceStrategy(diceStrategy: DiceI): void {
    this.diceStrategy = diceStrategy;
  }

  public getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  public addPlayer(player: Player): void {
    this.players.push(player);
  }

  public nextPlayer(): void {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % this.players.length;
  }

  // public play(): void {
  //   console.log("Game started!");

  //   console.log("Players: ");
  //   this.players.forEach((player) => {
  //     console.log(
  //       `Name: ${player.getName()}, Starting Position: ${player
  //         .getCurrentTile()
  //         .getTileNumber()}`
  //     );
  //   });
  //   console.log("Board size: " + this.board.getSize());
  //   console.log("Snakes: ");
  //   this.board.getSnakes().forEach((value, key) => {
  //     console.log(`From ${key.getTileNumber()} to ${value.getTileNumber()}`);
  //   });
  //   console.log("Ladders: ");
  //   this.board.getLadders().forEach((value, key) => {
  //     console.log(`From ${key.getTileNumber()} to ${value.getTileNumber()}`);
  //   });
  //   console.log("Game starts!");

  //   while (true) {
  //     const currentPlayer = this.getCurrentPlayer();
  //     console.log(`${currentPlayer.getName()}'s turn!`);

  //     const diceRoll = this.diceStrategy.roll();

  //     console.log(`Rolled: ${diceRoll}`);

  //     if (diceRoll == 0) {
  //       console.log(`${currentPlayer.getName()} rolled a 0! Skipping turn.`);
  //       this.nextPlayer();
  //       continue;
  //     }

  //     console.log(
  //       `${currentPlayer.getName()}'s current position: ${currentPlayer
  //         .getCurrentTile()
  //         .getTileNumber()}`
  //     );

  //     this.move(currentPlayer, diceRoll);

  //     if (
  //       currentPlayer.getCurrentTile().getTileNumber() == this.board.getSize()
  //     ) {
  //       console.log("Player " + currentPlayer.getName() + " wins!");
  //       break;
  //     }

  //     this.nextPlayer();
  //   }
  // }

  public move(player: Player, steps: number): void {
    let newPosition = player.getCurrentTile().getTileNumber() + steps;
    console.log(
      `${player.getName()} is moving from ${player
        .getCurrentTile()
        .getTileNumber()} to ${newPosition}`
    );

    if (newPosition > this.board.getSize()) {
      console.log(
        `${player.getName()} rolled too high and stays at position ${player
          .getCurrentTile()
          .getTileNumber()}`
      );
      return;
    }

    const targetTile = this.board.getTile(newPosition);

    if (this.board.getSnakes().has(targetTile)) {
      const snakeTail = this.board.getSnakes().get(targetTile);
      if (snakeTail) {
        console.log(
          `${player.getName()} encountered a snake! Sliding down to ${snakeTail.getTileNumber()}`
        );
        newPosition = snakeTail.getTileNumber();
      }
    } else if (this.board.getLadders().has(targetTile)) {
      const ladderTop = this.board.getLadders().get(targetTile);
      if (ladderTop) {
        console.log(
          `${player.getName()} climbed a ladder! Moving up to ${ladderTop.getTileNumber()}`
        );
        newPosition = ladderTop.getTileNumber();
      }
    }

    console.log(
      `${player.getName()} moved from ${player
        .getCurrentTile()
        .getTileNumber()} to ${newPosition}`
    );

    player.setCurrentTile(this.board.getTile(newPosition));
  }

  public playTurn(): void {
    if (this.gameOver) return;

    const currentPlayer = this.getCurrentPlayer();

    this.fireEvent("turnStarted", {
      player: currentPlayer,
    });

    const rollCommand = new RollDiceCommand(
      this,
      currentPlayer,
      this.diceStrategy
    );
    this.commandHistory.execute(rollCommand);

    if (!this.gameOver) {
      this.nextPlayer();

      // Fire turn ended event
      this.fireEvent("turnEnded", {
        nextPlayer: this.getCurrentPlayer(),
      });
    }
  }

  public undoLastMove(): void {
    if (this.gameOver) return;

    this.commandHistory.undo();

    this.currentPlayerIndex =
      (this.currentPlayerIndex - 1 + this.players.length) % this.players.length;

    this.fireEvent("turnRestored", {
      currentPlayer: this.getCurrentPlayer(),
    });
  }

  public play(): void {
    console.log("Game started!");

    // Setup game event listeners for logging
    this.setupEventListeners();

    // Reset game state
    this.gameOver = false;
    this.commandHistory.clear();

    this.fireEvent("gameStarted", {
      players: this.players,
      board: this.board,
    });

    while (!this.gameOver) {
      this.playTurn();
    }
  }

  private setupEventListeners(): void {
    this.addEventListener("diceRolled", (data) => {
      console.log(`${data.player.getName()} rolled a ${data.result}`);
    });

    this.addEventListener("moveCompleted", (data) => {
      console.log(
        `${data.player.getName()} moved from ${data.from.getTileNumber()} to ${data.to.getTileNumber()}`
      );
    });

    this.addEventListener("snake", (data) => {
      console.log(
        `${data.player.getName()} hit a snake! Sliding down from ${data.from.getTileNumber()} to ${data.to.getTileNumber()}`
      );
    });

    this.addEventListener("ladder", (data) => {
      console.log(
        `${data.player.getName()} found a ladder! Climbing up from ${data.from.getTileNumber()} to ${data.to.getTileNumber()}`
      );
    });

    this.addEventListener("turnSkipped", (data) => {
      console.log(
        `${data.player.getName()}'s turn was skipped: ${data.reason}`
      );
    });

    this.addEventListener("moveUndone", (data) => {
      console.log(
        `${data.player.getName()}'s move was undone, moved back from ${data.from.getTileNumber()} to ${data.to.getTileNumber()}`
      );
    });
  }
}

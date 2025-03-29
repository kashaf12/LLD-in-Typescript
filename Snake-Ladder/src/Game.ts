import { Board } from "./Board";
import { NormalDice } from "./Dice";
import { DiceI } from "./DiceI";
import { Player } from "./Player";

export class Game {
  private players: Player[];
  private currentPlayerIndex: number;
  private diceStrategy: DiceI;
  private board: Board;

  constructor(
    board: Board,
    players: Player[],
    diceStrategy: DiceI = new NormalDice(6)
  ) {
    this.players = players;
    this.board = board;
    this.currentPlayerIndex = 0;
    this.diceStrategy = diceStrategy;
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

  public play(): void {
    console.log("Game started!");

    console.log("Players: ");
    this.players.forEach((player) => {
      console.log(
        `Name: ${player.getName()}, Starting Position: ${player
          .getCurrentTile()
          .getTileNumber()}`
      );
    });
    console.log("Board size: " + this.board.getSize());
    console.log("Snakes: ");
    this.board.getSnakes().forEach((value, key) => {
      console.log(`From ${key.getTileNumber()} to ${value.getTileNumber()}`);
    });
    console.log("Ladders: ");
    this.board.getLadders().forEach((value, key) => {
      console.log(`From ${key.getTileNumber()} to ${value.getTileNumber()}`);
    });
    console.log("Game starts!");

    while (true) {
      const currentPlayer = this.getCurrentPlayer();
      console.log(`${currentPlayer.getName()}'s turn!`);

      const diceRoll = this.diceStrategy.roll();

      console.log(`Rolled: ${diceRoll}`);

      if (diceRoll == 0) {
        console.log(`${currentPlayer.getName()} rolled a 0! Skipping turn.`);
        this.nextPlayer();
        continue;
      }

      console.log(
        `${currentPlayer.getName()}'s current position: ${currentPlayer
          .getCurrentTile()
          .getTileNumber()}`
      );

      this.move(currentPlayer, diceRoll);

      if (
        currentPlayer.getCurrentTile().getTileNumber() == this.board.getSize()
      ) {
        console.log("Player " + currentPlayer.getName() + " wins!");
        break;
      }

      this.nextPlayer();
    }
  }

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
}

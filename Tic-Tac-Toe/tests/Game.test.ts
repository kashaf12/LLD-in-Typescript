import { CellType } from "../src/Cell";
import { CellFactory } from "../src/CellFactory";
import { Game } from "../src/Game";
import { Player } from "../src/Player";

describe("Game", () => {
  it("should create a game with players and board size", () => {
    const cellX = CellFactory.createCell(CellType.X);
    const cellY = CellFactory.createCell(CellType.Y);

    const player1 = new Player("Player 1", cellX);
    const player2 = new Player("Player 2", cellY);

    const game = new Game([player1, player2], 3);

    expect(game.getPlayers()).toEqual([player1, player2]);
    expect(game.getBoardSize()).toBe(3);
  });
});

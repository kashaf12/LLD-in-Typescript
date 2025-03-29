import { Board } from "../src/Board";
import { Game } from "../src/Game";
import { Player } from "../src/Player";
import { Tile } from "../src/Tile";

describe("Game", () => {
  let board: Board;
  let players: Player[];
  let game: Game;

  beforeEach(() => {
    board = new Board(10);
    players = [
      new Player("Player 1", new Tile(1)),
      new Player("Player 2", new Tile(1)),
    ];

    jest.spyOn(board, "getTile");
    jest.spyOn(players[0], "getName");
    jest.spyOn(players[0], "setCurrentTile");
    jest.spyOn(players[1], "getName");

    game = new Game(board, players);
  });
  it("should create a game with a board and players", () => {
    const game = new Game(board, players);

    expect(game).toBeInstanceOf(Game);
    expect(game["board"]).toBe(board);
    expect(game["players"]).toBe(players);
  });

  it("should set the dice strategy", () => {
    const game = new Game(board, players);

    const diceStrategy = { roll: jest.fn() };
    game.setDiceStrategy(diceStrategy);

    expect(game["diceStrategy"]).toBe(diceStrategy);
  });

  it("should play the game", () => {
    const game = new Game(board, players);

    const diceStrategy = { roll: jest.fn().mockReturnValue(3) };
    game.setDiceStrategy(diceStrategy);

    game.play();

    expect(players[0].setCurrentTile).toHaveBeenCalled();
  });
});

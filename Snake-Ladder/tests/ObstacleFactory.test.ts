import { Board } from "../src/Board";
import { ObstacleFactory } from "../src/ObstacleFactory";
import { Tile } from "../src/Tile";

describe("ObstacleFactory", () => {
  let board: Board;

  beforeEach(() => {
    board = new Board(100);
  });

  it("should create snakes on the board", () => {
    const snakes: [Tile, Tile][] = [
      [board.getTile(3), board.getTile(2)],
      [board.getTile(5), board.getTile(4)],
    ];
    ObstacleFactory.createSnakes(board, snakes);
    expect(board.getSnakes().size).toEqual(snakes.length);
  });

  it("should create ladders on the board", () => {
    const ladders: [Tile, Tile][] = [
      [board.getTile(2), board.getTile(3)],
      [board.getTile(4), board.getTile(5)],
    ];
    ObstacleFactory.createLadders(board, ladders);
    expect(board.getLadders().size).toEqual(ladders.length);
  });

  it("should create random snakes on the board", () => {
    ObstacleFactory.createRandomSnakes(board, 5);
    expect(board.getSnakes().size).toEqual(5);
  });
  it("should create random ladders on the board", () => {
    ObstacleFactory.createRandomLadders(board, 5);
    expect(board.getLadders().size).toEqual(5);
  });
  it("should not create ladders on the first and last tile", () => {
    ObstacleFactory.createRandomLadders(board, 5);
    const ladders = board.getLadders();
    expect(ladders.has(board.getTile(1))).toBe(false);
    expect(ladders.has(board.getTile(100))).toBe(false);
  });
  it("should not create snakes on the first and last tile", () => {
    ObstacleFactory.createRandomSnakes(board, 5);
    const snakes = board.getSnakes();
    expect(snakes.has(board.getTile(1))).toBe(false);
    expect(snakes.has(board.getTile(100))).toBe(false);
  });
});

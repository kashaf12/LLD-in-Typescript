import { Board } from "../src/Board";

describe("Board", () => {
  it("should create a board with the given size", () => {
    const board = new Board(10);
    expect(board).toBeInstanceOf(Board);
    expect(board.getSize()).toEqual(10);
  });

  it("should create a board with the default size of 10", () => {
    const board = new Board();
    expect(board).toBeInstanceOf(Board);
    expect(board.getSize()).toEqual(10);
  });

  it("should create a board with the given number of snakes", () => {
    const board = new Board(10);
    expect(board).toBeInstanceOf(Board);
    expect(board.getSize()).toEqual(10);
  });

  it("should add snakes to the board", () => {
    const board = new Board(10);
    const startTile = board.getTile(3);
    const endTile = board.getTile(2);
    board.addSnake(startTile, endTile);
    expect(board.getSnakes().get(startTile)).toEqual(endTile);
  });

  it("should add ladders to the board", () => {
    const board = new Board(10);
    const startTile = board.getTile(2);
    const endTile = board.getTile(3);
    board.addLadder(startTile, endTile);
    expect(board.getLadders().get(startTile)).toEqual(endTile);
  });
  it("should return the correct tile for a given tile number", () => {
    const board = new Board(10);
    const tileNumber = 5;
    const tile = board.getTile(tileNumber);
    expect(tile.getTileNumber()).toEqual(tileNumber);
  });
  it("should return all tiles on the board", () => {
    const board = new Board(10);
    const tiles = board.getTiles();
    expect(tiles.length).toEqual(10);
    expect(tiles[0].getTileNumber()).toEqual(1);
    expect(tiles[9].getTileNumber()).toEqual(10);
  });
  it("should return all snakes on the board", () => {
    const board = new Board(10);
    const startTile = board.getTile(3);
    const endTile = board.getTile(2);
    board.addSnake(startTile, endTile);
    const snakes = board.getSnakes();
    expect(snakes.size).toEqual(1);
    expect(snakes.get(startTile)).toEqual(endTile);
  });
});

import { Board } from "../src/Board";

describe("Board", () => {
  it("should create a board with the correct size", () => {
    const board = new Board(3);
    expect(board.getSize()).toBe(3);
  });

  it("should allow checking if the board has empty cells", () => {
    const board = new Board(3);
    expect(board.hasEmptyCells()).toBeTruthy();
  });
});

import { Board } from "./Board";
import { Tile } from "./Tile";

export class ObstacleFactory {
  public static createSnakes(board: Board, snakes: [Tile, Tile][]) {
    for (let [startSnakeTile, endSnakeTile] of snakes) {
      board.addSnake(startSnakeTile, endSnakeTile);
    }
  }

  public static createLadders(board: Board, ladders: [Tile, Tile][]) {
    for (let [startLadderTile, endLadderTile] of ladders) {
      board.addLadder(startLadderTile, endLadderTile);
    }
  }

  public static createRandomSnakes(board: Board, snakes: number) {
    const usedTiles = new Set<Tile>();
    const size = board.getSize();
    usedTiles.add(board.getTile(1));
    usedTiles.add(board.getTile(board.getSize()));
    while (snakes) {
      const startTileNumber = Math.floor(Math.random() * (size - 4)) + 3;
      const endTileNumber =
        Math.floor(Math.random() * (startTileNumber - 3)) + 2;

      const startTile = board.getTile(startTileNumber);
      const endTile = board.getTile(endTileNumber);

      if (
        !startTile ||
        !endTile ||
        usedTiles.has(startTile) ||
        usedTiles.has(endTile)
      ) {
        continue;
      }

      board.addSnake(startTile, endTile);
      snakes--;
    }
  }

  public static createRandomLadders(board: Board, ladders: number) {
    const usedTiles = new Set<Tile>();
    usedTiles.add(board.getTile(1));
    usedTiles.add(board.getTile(board.getSize()));
    const size = board.getSize();
    while (ladders) {
      const startTileNumber = Math.floor(Math.random() * (size - 4)) + 2;
      const endTileNumber =
        Math.floor(Math.random() * (size - startTileNumber)) +
        startTileNumber +
        1;

      const startTile = board.getTile(startTileNumber);
      const endTile = board.getTile(endTileNumber);

      if (
        !startTile ||
        !endTile ||
        usedTiles.has(startTile) ||
        usedTiles.has(endTile)
      ) {
        continue;
      }
      board.addLadder(startTile, endTile);
      ladders--;
    }
  }
}

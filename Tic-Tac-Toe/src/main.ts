import { CellType } from "./Cell";
import { CellFactory } from "./CellFactory";
import { Game } from "./Game";
import { Player } from "./Player";

function init() {
  const playerXCell = CellFactory.createCell(CellType.X);
  const playerYCell = CellFactory.createCell(CellType.Y);

  const player1 = new Player("Player 1", playerXCell);
  const player2 = new Player("Player 2", playerYCell);

  const game = new Game([player1, player2], 3);
  game.startGame();
}

init();

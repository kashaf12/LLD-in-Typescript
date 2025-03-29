import { CellX } from "./CellX";
import { CellY } from "./CellY";
import { Game } from "./Game";
import { Player } from "./Player";

function init() {
  const player1 = new Player("Player 1", new CellX());
  const player2 = new Player("Player 2", new CellY());

  const game = new Game([player1, player2], 3);
  game.startGame();
}

init();

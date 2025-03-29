import { Board } from "./Board";
import { NormalDice } from "./Dice";
import { Game } from "./Game";
import { ObstacleFactory } from "./ObstacleFactory";
import { Player } from "./Player";

function init() {
  const board = new Board(100);

  ObstacleFactory.createRandomSnakes(board, 5);
  ObstacleFactory.createRandomLadders(board, 5);

  const player1 = new Player("Player 1", board.getTile(1));
  const player2 = new Player("Player 2", board.getTile(1));

  const game = new Game(board, [player1, player2]);

  const dice = new NormalDice(6);

  game.setDiceStrategy(dice);

  game.play();
}

init();

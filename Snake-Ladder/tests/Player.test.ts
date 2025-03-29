import { Player } from "../src/Player";
import { Tile } from "../src/Tile";

describe("Player", () => {
  it("should create a player with a name and starting tile", () => {
    const playerName = "Player 1";
    const startTile = new Tile(1);
    const player = new Player(playerName, startTile);

    expect(player.getName()).toBe(playerName);
    expect(player.getCurrentTile()).toEqual(startTile);
  });

  it("should return the player's name", () => {
    const playerName = "Player 2";
    const startTile = new Tile(1);
    const player = new Player(playerName, startTile);

    expect(player.getName()).toBe(playerName);
  });
  it("should return the player's current tile", () => {
    const playerName = "Player 3";
    const startTile = new Tile(1);
    const player = new Player(playerName, startTile);

    expect(player.getCurrentTile()).toEqual(startTile);
  });

  it("should set the player's current tile", () => {
    const playerName = "Player 4";
    const startTile = new Tile(1);
    const player = new Player(playerName, startTile);
    const newTile = new Tile(2);

    player.setCurrentTile(newTile);
    expect(player.getCurrentTile()).toEqual(newTile);
  });
});

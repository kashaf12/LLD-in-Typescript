import { DiceI } from "./DiceI";

export class NormalDice implements DiceI {
  private sides: number;
  constructor(sides: number) {
    if (sides < 2) {
      throw new Error("Dice must have at least 2 sides");
    }
    this.sides = sides;
  }

  roll(): number {
    return Math.floor(Math.random() * (this.sides - 1)) + 1;
  }
}

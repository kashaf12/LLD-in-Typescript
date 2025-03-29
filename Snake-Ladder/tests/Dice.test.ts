import { NormalDice as Dice } from "../src/Dice";

describe("Dice", () => {
  it("should create a dice with the given number of sides", () => {
    const sides = 8;
    const dice = new Dice(sides);
    expect(dice).toBeInstanceOf(Dice);
    expect(dice["sides"]).toBe(sides);
  });

  it("should throw an error if the number of sides is less than 2", () => {
    const sides = 1;
    expect(() => new Dice(sides)).toThrow("Dice must have at least 2 sides");
  });

  it("should roll a number between 1 and the number of sides", () => {
    const sides = 6;
    const dice = new Dice(sides);
    const rollResult = dice.roll();
    expect(rollResult).toBeGreaterThanOrEqual(1);
    expect(rollResult).toBeLessThanOrEqual(sides);
  });
});

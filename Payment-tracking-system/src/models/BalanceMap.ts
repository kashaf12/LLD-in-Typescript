import { Amount } from "./Amount";
import { User } from "./User";

export class BalanceMap {
  private balances: Map<string, Amount>;

  public constructor() {
    this.balances = new Map();
  }

  public getBalances() {
    return this.balances;
  }
}

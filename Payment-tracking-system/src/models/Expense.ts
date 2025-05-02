import { BalanceMap } from "./BalanceMap";

export class Expense {
  private userBalances: BalanceMap;

  private id: string;
  private desc: string;
  private groupId: string;

  constructor(
    userBalances: BalanceMap,
    groupId: string,
    id: string,
    desc: string
  ) {
    this.userBalances = userBalances;
    this.id = id;
    this.desc = desc;
    this.groupId = groupId;
  }

  public getUserBalances() {
    return this.userBalances;
  }

  public getGroupId() {
    return this.groupId;
  }
}

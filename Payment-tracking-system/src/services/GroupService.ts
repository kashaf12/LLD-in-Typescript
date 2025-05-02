import { Amount } from "../models/Amount";
import { BalanceMap } from "../models/BalanceMap";
import { Expense } from "../models/Expense";
import { Group } from "../models/Group";
import { PaymentGraph } from "../models/PaymentGraph";
import { ExpenseService } from "./ExpenseService";

export class GroupService {
  private expenseService: ExpenseService;
  private groups: Map<string, Group> = new Map();

  constructor(expenseService: ExpenseService, groups: Map<string, Group>) {
    this.expenseService = expenseService;
    this.groups = groups;
  }

  public getGroupPaymentGraph(
    groupId: string,
    userId: string
  ): PaymentGraph | null {
    const resultExpense = this.getBalances(groupId, userId);
    return this.expenseService.getPaymentGraph(resultExpense);
  }

  private sumExpenses(expenses: Expense[] = []) {
    const resultBalanceMap = new BalanceMap();

    for (const expense of expenses) {
      for (const userBalances of expense
        .getUserBalances()
        .getBalances()
        .entries()) {
        const [user, amount] = userBalances;

        const currentAmount =
          resultBalanceMap.getBalances().get(user) || new Amount(0);

        const newAmount = currentAmount.add(amount);

        resultBalanceMap.getBalances().set(user, newAmount);
      }
    }

    return resultBalanceMap;
  }

  public getBalances(groupId: string, userId: string) {
    if (!this.groups.has(groupId)) throw new Error("Group Not Found");
    if (!this.groups.get(groupId)?.getUserIds().includes(userId))
      throw new Error("user is not in the group");

    const groupExpenses = this.expenseService.getGroupExpenses(groupId);

    const resultExpense = this.sumExpenses(groupExpenses);

    return resultExpense;
  }
}

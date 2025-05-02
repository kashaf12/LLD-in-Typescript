import PriorityQueue from "js-priority-queue";
import { BalanceMap } from "../models/BalanceMap";
import { Expense } from "../models/Expense";
import { PaymentGraph } from "../models/PaymentGraph";
import { User } from "../models/User";
import { Amount } from "../models/Amount";

export class ExpenseService {
  private groupExpenses: Map<string, Expense[]>;

  constructor(groupExpenses: Map<string, Expense[]> = new Map()) {
    this.groupExpenses = groupExpenses;
  }

  public getGroupExpenses(groupId: string) {
    return this.groupExpenses.get(groupId);
  }

  public getPaymentGraph(balanceMap: BalanceMap): PaymentGraph {
    const graph = new Map<string, BalanceMap>();

    const positiveAmounts = new PriorityQueue<[string, Amount]>({
      comparator: (a, b) => b[1].getAmount() - a[1].getAmount(), // descending
    });

    const negativeAmounts = new PriorityQueue<[string, Amount]>({
      comparator: (a, b) => a[1].getAmount() - b[1].getAmount(), // ascending
    });

    for (const userBalance of balanceMap.getBalances().entries()) {
      if (userBalance[1].getAmount() > 0) {
        positiveAmounts.queue(userBalance);
      } else {
        negativeAmounts.queue(userBalance);
      }
    }

    while (positiveAmounts.length > 0 && negativeAmounts.length > 0) {
      const [creditor, posAmount] = positiveAmounts.dequeue();
      const [debtor, negAmount] = negativeAmounts.dequeue();
      const positiveAmount = posAmount.getAmount();
      const negativeAmount = -negAmount.getAmount();

      const transferAmount = Math.min(positiveAmount, negativeAmount);
      const transfer = new Amount(transferAmount, "USD");

      if (!graph.get(creditor)) {
        graph.set(creditor, new BalanceMap());
      }

      graph.get(creditor)!.getBalances().set(debtor, transfer);

      const remaining = positiveAmount - negativeAmount;

      if (remaining > 0) {
        positiveAmounts.queue([creditor, new Amount(remaining, "USD")]);
      } else if (remaining < 0) {
        negativeAmounts.queue([debtor, new Amount(remaining, "USD")]);
      }
    }

    return new PaymentGraph(graph);
  }

  public addExpense(expense: Expense) {
    const groupId = expense.getGroupId();

    if (!this.groupExpenses.has(groupId)) this.groupExpenses.set(groupId, []);

    this.groupExpenses.get(groupId)!.push(expense);
  }
}

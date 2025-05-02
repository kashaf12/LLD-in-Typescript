import { Amount } from "../src/models/Amount";
import { BalanceMap } from "../src/models/BalanceMap";
import { Expense } from "../src/models/Expense";
import { Group } from "../src/models/Group";
import { ExpenseService } from "../src/services/ExpenseService";
import { GroupService } from "../src/services/GroupService";

function constructExpenseService() {
  const expenseService = new ExpenseService();

  const firstExpense = new BalanceMap();
  firstExpense.getBalances().set("A", new Amount(10, "USD"));
  firstExpense.getBalances().set("B", new Amount(20, "USD"));
  firstExpense.getBalances().set("C", new Amount(-30, "USD"));

  expenseService.addExpense(
    new Expense(firstExpense, "123", "outing1", "outing 1")
  );

  const secondExpense = new BalanceMap();
  secondExpense.getBalances().set("A", new Amount(-50, "USD"));
  secondExpense.getBalances().set("B", new Amount(10, "USD"));
  secondExpense.getBalances().set("C", new Amount(40, "USD"));

  expenseService.addExpense(
    new Expense(secondExpense, "123", "outing2", "outing 2")
  );

  const thirdExpense = new BalanceMap();
  thirdExpense.getBalances().set("A", new Amount(90, "USD"));
  thirdExpense.getBalances().set("C", new Amount(-90, "USD"));

  expenseService.addExpense(
    new Expense(thirdExpense, "123", "outing3", "outing 3")
  );

  return expenseService;
}

function constructExpenseService2() {
  const expenseService = new ExpenseService();

  const firstExpense = new BalanceMap();
  firstExpense.getBalances().set("A", new Amount(90, "USD"));
  firstExpense.getBalances().set("B", new Amount(-70, "USD"));
  firstExpense.getBalances().set("C", new Amount(-40, "USD"));
  firstExpense.getBalances().set("D", new Amount(80, "USD"));
  firstExpense.getBalances().set("E", new Amount(-100, "USD"));
  firstExpense.getBalances().set("F", new Amount(40, "USD"));

  expenseService.addExpense(
    new Expense(firstExpense, "123", "outing1", "outing 1")
  );

  return expenseService;
}

describe("GroupPaymentGraph", () => {
  it("default test", () => {
    const expenseService = constructExpenseService();
    const userIds = ["A", "B", "C", "D"];
    const groups = new Map<string, Group>();
    groups.set("123", new Group("123", "Delhi", "Delhi trip", userIds));

    const groupService = new GroupService(expenseService, groups);

    const balances = groupService.getBalances("123", "A");

    expect(balances.getBalances().get("A")?.getAmount()).toEqual(50);
    expect(balances.getBalances().get("B")?.getAmount()).toEqual(30);
    expect(balances.getBalances().get("C")?.getAmount()).toEqual(-80);
  });

  it("Payment graph test", () => {
    const expenseService = constructExpenseService2();
    const userIds = ["A", "B", "C", "D", "E", "F"];
    const groups = new Map<string, Group>();
    groups.set("123", new Group("123", "Delhi", "Delhi trip", userIds));

    const groupService = new GroupService(expenseService, groups);

    const balances = groupService.getGroupPaymentGraph("123", "A");
    expect(balances).toBeDefined();

    const graph = balances?.getGraph();
    expect(graph?.get("A")?.getBalances().get("E")?.getAmount()).toEqual(90);
    expect(graph?.get("D")?.getBalances().get("B")?.getAmount()).toEqual(70);
    expect(graph?.get("D")?.getBalances().get("E")?.getAmount()).toEqual(10);
    expect(graph?.get("F")?.getBalances().get("C")?.getAmount()).toEqual(40);

    console.log(balances?.toString());
  });
});

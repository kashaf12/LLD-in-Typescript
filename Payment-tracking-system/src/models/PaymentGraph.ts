import { BalanceMap } from "./BalanceMap";

export class PaymentGraph {
  private graph: Map<string, BalanceMap>;

  public constructor(graph: Map<string, BalanceMap>) {
    this.graph = graph;
  }

  public toString() {
    const result = [];
    for (const [userId, balanceMap] of this.graph) {
      const nestedIt = [];
      for (const [bUserId, amount] of balanceMap.getBalances().entries()) {
        nestedIt.push(
          `${bUserId} : ${amount.getAmount()} ${amount.getCurrency()}`
        );
      }
      result.push(`${userId} => ${nestedIt.join(",\n")}`);
    }

    return result.join(", \n");
  }

  public getGraph() {
    return this.graph;
  }
}

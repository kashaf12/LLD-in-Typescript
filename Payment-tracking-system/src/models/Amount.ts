export class Amount {
  private amount: number;
  private currency: string;

  constructor(amount: number, currency?: string) {
    this.amount = amount;
    this.currency = currency ?? "USD";
  }

  public add(amount: Amount) {
    this.amount += amount.getAmount();
    return this;
  }

  public getAmount() {
    return this.amount;
  }

  public getCurrency() {
    return this.currency;
  }
}

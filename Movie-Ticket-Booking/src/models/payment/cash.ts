import { PaymentMethod } from "./payment-method";

export class CashPayment implements PaymentMethod {
  private amountTendered: number;
  private changeGiven: number = 0;
  private receiptNumber: string | null = null;

  constructor(amountTendered: number) {
    this.amountTendered = amountTendered;
  }

  public getAmountTendered(): number {
    return this.amountTendered;
  }

  public getChangeGiven(): number {
    return this.changeGiven;
  }

  public getReceiptNumber(): string | null {
    return this.receiptNumber;
  }

  public processPayment(amount: number): boolean {
    if (this.amountTendered < amount) {
      console.log(
        `Insufficient cash tendered: $${this.amountTendered.toFixed(
          2
        )} for amount $${amount.toFixed(2)}`
      );
      return false;
    }

    this.changeGiven = this.amountTendered - amount;

    this.receiptNumber = `CASH_${Date.now()}_${Math.floor(
      Math.random() * 1000
    )}`;

    console.log(
      `Processed cash payment of $${amount.toFixed(
        2
      )}, tendered: $${this.amountTendered.toFixed(
        2
      )}, change: $${this.changeGiven.toFixed(2)}`
    );
    return true;
  }

  public refundPayment(amount: number): boolean {
    console.log(
      `Manual cash refund of $${amount.toFixed(2)} processed. Receipt #: ${
        this.receiptNumber
      }`
    );
    return true;
  }
}

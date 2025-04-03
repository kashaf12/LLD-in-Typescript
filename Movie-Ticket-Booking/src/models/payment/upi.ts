import { PaymentMethod } from "./payment-method";

export class UPIPayment implements PaymentMethod {
  private upiId: string;
  private transactionRef: string | null = null;

  constructor(upiId: string) {
    this.upiId = upiId;
  }

  public getUpiId(): string {
    return this.upiId;
  }

  public getTransactionRef(): string | null {
    return this.transactionRef;
  }

  public processPayment(amount: number): boolean {
    try {
      console.log(
        `Processing UPI payment of $${amount.toFixed(2)} for ID: ${this.upiId}`
      );

      if (this.isValidUpiId()) {
        this.transactionRef = `UPI_${Date.now()}_${Math.floor(
          Math.random() * 1000
        )}`;
        return true;
      }

      return false;
    } catch (error) {
      console.error(`UPI payment error: ${error}`);
      return false;
    }
  }

  public refundPayment(amount: number): boolean {
    try {
      if (!this.transactionRef) {
        return false;
      }

      console.log(`Refunding $${amount.toFixed(2)} to UPI ID: ${this.upiId}`);

      return true;
    } catch (error) {
      console.error(`UPI refund error: ${error}`);
      return false;
    }
  }

  private isValidUpiId(): boolean {
    return this.upiId.includes("@");
  }
}

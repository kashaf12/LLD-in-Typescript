import { PaymentMethod, PaymentStatus } from "../constants/enums";
import { PaymentStrategy } from "../interfaces/PaymentStrategy";

export class Payment {
  private paymentStrategy: PaymentStrategy | null = null;

  constructor(
    private amount: number,
    private timestamp: Date,
    private status: PaymentStatus,
    private method: PaymentMethod
  ) {}

  getAmount(): number {
    return this.amount;
  }

  getTimestamp(): Date {
    return this.timestamp;
  }

  getStatus(): PaymentStatus {
    return this.status;
  }

  getMethod(): PaymentMethod {
    return this.method;
  }

  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentStrategy = strategy;
  }

  processPayment(): PaymentStatus {
    if (!this.paymentStrategy) {
      throw new Error("Payment strategy not set");
    }
    this.paymentStrategy!.processPayment(this.amount);
    this.status = PaymentStatus.COMPLETED;
    return this.status;
  }
}

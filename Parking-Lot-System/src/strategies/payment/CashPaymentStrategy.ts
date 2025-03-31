import { PaymentStatus } from "../../constants/enums";
import { PaymentStrategy } from "../../interfaces/PaymentStrategy";

export class CashPaymentStrategy implements PaymentStrategy {
  processPayment(amount: number): PaymentStatus {
    console.log(`Processing cash payment of ${amount}`);
    // Simulate cash payment processing
    return PaymentStatus.COMPLETED;
  }
}

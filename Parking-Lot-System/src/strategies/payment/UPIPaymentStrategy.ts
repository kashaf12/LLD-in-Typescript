import { PaymentStatus } from "../../constants/enums";
import { PaymentStrategy } from "../../interfaces/PaymentStrategy";

export class UPIPaymentStrategy implements PaymentStrategy {
  constructor(
    private merchantId: string = "PARKINGLOT123",
    private apiKey: string = "upi-api-key-12345"
  ) {}

  processPayment(amount: number): PaymentStatus {
    console.log(`Processing UPI payment of ${amount}`);

    // Simulate UPI payment processing

    return PaymentStatus.COMPLETED;
  }
}

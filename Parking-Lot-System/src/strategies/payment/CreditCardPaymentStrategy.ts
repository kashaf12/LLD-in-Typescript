import { PaymentStatus } from "../../constants/enums";
import { PaymentStrategy } from "../../interfaces/PaymentStrategy";

export class CreditCardPaymentStrategy implements PaymentStrategy {
  constructor(
    private gatewayUrl: string = "https://payment-gateway.example.com"
  ) {}

  processPayment(amount: number): PaymentStatus {
    console.log(`Processing credit card payment of ${amount}`);

    // Simulate connecting to payment gateway
    if (!this.connectToGateway()) {
      console.log("Failed to connect to payment gateway");
      return PaymentStatus.FAILED;
    }

    return PaymentStatus.COMPLETED;
  }

  connectToGateway(): boolean {
    // Simulate connecting to payment gateway
    // In a real implementation, this would be an API call
    try {
      console.log(`Connecting to payment gateway at ${this.gatewayUrl}`);
      // Simulate successful connection
      return true;
    } catch (error) {
      console.error("Failed to connect to payment gateway:", error);
      return false;
    }
  }
}

import { PaymentStatus } from "../constants/enums";

export interface PaymentStrategy {
  processPayment(amount: number): PaymentStatus;
}

export interface PaymentMethod {
  processPayment(amount: number): boolean;
  refundPayment(amount: number): boolean;
}

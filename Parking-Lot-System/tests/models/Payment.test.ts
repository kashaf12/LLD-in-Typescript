import { PaymentMethod, PaymentStatus } from "../../src/constants/enums";
import { Payment } from "../../src/models/Payment";
import { CreditCardPaymentStrategy } from "../../src/strategies/payment/CreditCardPaymentStrategy";

describe("Payment", () => {
  it("should create a Payment instance with the correct properties", () => {
    const amount = 100;
    const date = new Date();
    const status = PaymentStatus.UNPAID;
    const method = PaymentMethod.CREDIT_CARD;

    const payment = new Payment(amount, date, status, method);

    expect(payment.getAmount()).toBe(amount);
    expect(payment.getTimestamp()).toBe(date);
    expect(payment.getStatus()).toBe(status);
    expect(payment.getMethod()).toBe(method);
  });

  it("should process payment and update status", () => {
    const amount = 100;
    const date = new Date();
    const status = PaymentStatus.UNPAID;
    const method = PaymentMethod.CREDIT_CARD;

    const payment = new Payment(amount, date, status, method);
    payment.setPaymentStrategy(new CreditCardPaymentStrategy());

    payment.processPayment();

    expect(payment.getStatus()).toBe(PaymentStatus.COMPLETED);
  });
});

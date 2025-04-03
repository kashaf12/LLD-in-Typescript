import { PaymentMethod } from "./payment-method";

export class CreditCardPayment implements PaymentMethod {
  private cardNumber: string;
  private nameOnCard: string;
  private expiryDate: string;
  private cvv: string;
  private transactionId: string | null = null;

  constructor(
    cardNumber: string,
    nameOnCard: string,
    expiryDate: string,
    cvv: string
  ) {
    this.cardNumber = cardNumber;
    this.nameOnCard = nameOnCard;
    this.expiryDate = expiryDate;
    this.cvv = cvv;
  }

  public getNameOnCard(): string {
    return this.nameOnCard;
  }

  public getLast4Digits(): string {
    return this.cardNumber.slice(-4);
  }

  public getExpiryDate(): string {
    return this.expiryDate;
  }

  public processPayment(amount: number): boolean {
    try {
      console.log(
        `Processing credit card payment of $${amount.toFixed(
          2
        )} for card ending in ${this.getLast4Digits()}`
      );

      if (this.isValidCard()) {
        this.transactionId = `CC_${Date.now()}_${Math.floor(
          Math.random() * 1000
        )}`;
        return true;
      }

      return false;
    } catch (error) {
      console.error(`Credit card payment error: ${error}`);
      return false;
    }
  }

  public refundPayment(amount: number): boolean {
    try {
      if (!this.transactionId) {
        return false;
      }

      console.log(
        `Refunding $${amount.toFixed(
          2
        )} to card ending in ${this.getLast4Digits()}`
      );

      return true;
    } catch (error) {
      console.error(`Credit card refund error: ${error}`);
      return false;
    }
  }

  private isValidCard(): boolean {
    const expiry = this.expiryDate.split("/");
    if (expiry.length !== 2) return false;

    const expiryMonth = parseInt(expiry[0]);
    const expiryYear = parseInt(expiry[1]);

    const now = new Date();
    const currentYear = now.getFullYear() % 100; // Get last two digits
    const currentMonth = now.getMonth() + 1;

    if (
      expiryYear < currentYear ||
      (expiryYear === currentYear && expiryMonth < currentMonth)
    ) {
      return false;
    }

    if (this.cardNumber.length < 13 || this.cardNumber.length > 19) {
      return false;
    }

    if (this.cvv.length < 3 || this.cvv.length > 4) {
      return false;
    }

    return true;
  }
}

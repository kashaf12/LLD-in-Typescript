import { Booking } from "../booking/booking";
import { PaymentMethod } from "./payment-method";
import { PaymentStatus, NotificationType } from "../../types/enums";
import { NotificationService } from "../../services/notification-service";

export class Payment {
  private paymentId: string;
  private amount: number;
  private createdOn: Date;
  private status: PaymentStatus;
  private booking: Booking;
  private method: PaymentMethod;

  constructor(
    paymentId: string,
    amount: number,
    booking: Booking,
    method: PaymentMethod
  ) {
    this.paymentId = paymentId;
    this.amount = amount;
    this.createdOn = new Date();
    this.status = PaymentStatus.PENDING;
    this.booking = booking;
    this.method = method;
  }

  public getPaymentId(): string {
    return this.paymentId;
  }

  public getAmount(): number {
    return this.amount;
  }

  public getCreatedOn(): Date {
    return this.createdOn;
  }

  public getStatus(): PaymentStatus {
    return this.status;
  }

  public getBooking(): Booking {
    return this.booking;
  }

  public processPayment(): boolean {
    try {
      if (this.method.processPayment(this.amount)) {
        this.status = PaymentStatus.COMPLETED;

        NotificationService.getInstance().notify(
          this.booking.getCustomer(),
          NotificationType.PAYMENT_CONFIRMATION,
          `Payment of $${this.amount.toFixed(
            2
          )} for booking ${this.booking.getBookingId()} has been processed successfully.`
        );

        return true;
      } else {
        this.status = PaymentStatus.FAILED;
        return false;
      }
    } catch (error) {
      this.status = PaymentStatus.FAILED;
      console.error(`Payment processing error: ${error}`);
      return false;
    }
  }

  public refundPayment(): boolean {
    if (this.status !== PaymentStatus.COMPLETED) {
      return false;
    }

    try {
      if (this.method.refundPayment(this.amount)) {
        this.status = PaymentStatus.REFUNDED;

        NotificationService.getInstance().notify(
          this.booking.getCustomer(),
          NotificationType.PAYMENT_REFUND,
          `Refund of $${this.amount.toFixed(
            2
          )} for booking ${this.booking.getBookingId()} has been processed.`
        );

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(`Refund processing error: ${error}`);
      return false;
    }
  }
}

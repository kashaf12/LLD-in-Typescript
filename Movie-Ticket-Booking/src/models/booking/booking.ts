import { Customer } from "../user/customer";
import { Show } from "../show/show";
import { ShowSeat } from "../show/show-seat";
import { Payment } from "../payment/payment";
import { Coupon } from "./coupon";
import { BookingStatus, NotificationType } from "../../types/enums";
import { NotificationService } from "../../services/notification-service";

export class Booking {
  private bookingId: string;
  private createdOn: Date;
  private customer: Customer;
  private show: Show;
  private seats: ShowSeat[];
  private status: BookingStatus;
  private amount: number;
  private payment: Payment | null = null;
  private coupon: Coupon | null = null;

  constructor(
    bookingId: string,
    customer: Customer,
    show: Show,
    seats: ShowSeat[]
  ) {
    this.bookingId = bookingId;
    this.createdOn = new Date();
    this.customer = customer;
    this.show = show;
    this.seats = seats;
    this.status = BookingStatus.REQUESTED;

    this.amount = this.calculateTotalAmount();
  }

  public getBookingId(): string {
    return this.bookingId;
  }

  public getCreatedOn(): Date {
    return this.createdOn;
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public getShow(): Show {
    return this.show;
  }

  public getSeats(): ShowSeat[] {
    return this.seats;
  }

  public getStatus(): BookingStatus {
    return this.status;
  }

  public getAmount(): number {
    return this.amount;
  }

  // Payment methods
  public makePayment(payment: Payment): boolean {
    if (
      this.status !== BookingStatus.REQUESTED &&
      this.status !== BookingStatus.PENDING
    ) {
      return false;
    }

    if (payment.processPayment()) {
      this.payment = payment;
      this.status = BookingStatus.CONFIRMED;

      for (const seat of this.seats) {
        seat.book();
      }

      NotificationService.getInstance().notify(
        this.customer,
        NotificationType.BOOKING_CONFIRMATION,
        `Your booking (ID: ${this.bookingId}) has been confirmed.`
      );

      return true;
    }

    return false;
  }

  public cancel(): boolean {
    if (this.status !== BookingStatus.CONFIRMED) {
      return false;
    }

    // Refund payment if exists
    if (this.payment) {
      // Only attempt refund if payment exists and was successful
      this.payment.refundPayment();
    }

    // Release seats
    for (const seat of this.seats) {
      seat.unreserve();
    }

    this.status = BookingStatus.CANCELLED;

    // Send notification
    NotificationService.getInstance().notify(
      this.customer,
      NotificationType.BOOKING_CANCELLATION,
      `Your booking (ID: ${this.bookingId}) has been cancelled.`
    );

    return true;
  }

  public applyCoupon(coupon: Coupon): boolean {
    if (!coupon.isValid()) {
      return false;
    }

    this.coupon = coupon;
    this.amount = coupon.applyDiscount(this.calculateTotalAmount());

    return true;
  }

  private calculateTotalAmount(): number {
    let totalAmount = 0;

    for (const seat of this.seats) {
      totalAmount += seat.getPrice();
    }

    return totalAmount;
  }
}

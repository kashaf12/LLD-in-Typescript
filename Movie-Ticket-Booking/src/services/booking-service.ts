import { Customer } from "../models/user/customer";
import { Show } from "../models/show/show";
import { ShowSeat } from "../models/show/show-seat";
import { Booking } from "../models/booking/booking";
import { Coupon } from "../models/booking/coupon";
import { Payment } from "../models/payment/payment";
import { PaymentMethod } from "../models/payment/payment-method";
import { BookingStatus, NotificationType } from "../types/enums";
import { NotificationService } from "./notification-service";

export class BookingService {
  private static instance: BookingService;
  private bookings: Map<string, Booking> = new Map();
  private bookingIdCounter: number = 1;
  private paymentIdCounter: number = 1;

  private constructor() {
    this.startReservationCleanupJob();
  }

  // Get singleton instance
  public static getInstance(): BookingService {
    if (!BookingService.instance) {
      BookingService.instance = new BookingService();
    }
    return BookingService.instance;
  }

  // Create a new booking
  public createBooking(
    customer: Customer,
    show: Show,
    seatIds: string[]
  ): Booking | null {
    try {
      const selectedSeats: ShowSeat[] = [];
      const allSeats = show.getShowSeats();

      for (const seatId of seatIds) {
        const seat = allSeats.find((s) => s.getId() === seatId);
        if (!seat) {
          console.error(
            `Seat with ID ${seatId} not found in show ${show.getShowId()}`
          );
          return null;
        }
        selectedSeats.push(seat);
      }

      for (const seat of selectedSeats) {
        if (!seat.reserve()) {
          for (const reservedSeat of selectedSeats) {
            if (reservedSeat === seat) break;
            reservedSeat.unreserve();
          }
          console.error(`Failed to reserve seat ${seat.getId()}`);
          return null;
        }
      }

      const bookingId = `BOOK_${this.bookingIdCounter++}`;

      const booking = new Booking(bookingId, customer, show, selectedSeats);

      this.bookings.set(bookingId, booking);

      customer.makeBooking(booking);

      return booking;
    } catch (error) {
      console.error(`Error creating booking: ${error}`);
      return null;
    }
  }

  public processPayment(
    booking: Booking,
    paymentMethod: PaymentMethod
  ): boolean {
    if (
      booking.getStatus() !== BookingStatus.REQUESTED &&
      booking.getStatus() !== BookingStatus.PENDING
    ) {
      console.error(
        `Cannot process payment for booking ${booking.getBookingId()} with status ${booking.getStatus()}`
      );
      return false;
    }

    const payment = new Payment(
      `PAY_${this.paymentIdCounter++}`,
      booking.getAmount(),
      booking,
      paymentMethod
    );

    return booking.makePayment(payment);
  }

  public applyCoupon(booking: Booking, couponCode: string): boolean {
    const validUntil = new Date();
    validUntil.setFullYear(validUntil.getFullYear() + 1);

    const coupon = new Coupon(couponCode, 10, validUntil); // 10% discount

    return booking.applyCoupon(coupon);
  }

  public cancelBooking(booking: Booking): boolean {
    return booking.cancel();
  }

  public getBooking(bookingId: string): Booking | undefined {
    return this.bookings.get(bookingId);
  }

  public getBookingsForCustomer(customer: Customer): Booking[] {
    return customer.getBookings();
  }

  public getBookingsForShow(show: Show): Booking[] {
    const result: Booking[] = [];

    this.bookings.forEach((booking) => {
      if (booking.getShow() === show) {
        result.push(booking);
      }
    });

    return result;
  }

  private startReservationCleanupJob(): void {
    setInterval(() => {
      console.log("Running expired reservation cleanup job");

      this.bookings.forEach((booking) => {
        if (booking.getStatus() === BookingStatus.REQUESTED) {
          const creationTime = booking.getCreatedOn().getTime();
          const currentTime = new Date().getTime();
          const tenMinutesInMs = 10 * 60 * 1000;

          if (currentTime - creationTime > tenMinutesInMs) {
            console.log(
              `Cancelling expired booking: ${booking.getBookingId()}`
            );

            booking.getSeats().forEach((seat) => {
              seat.unreserve();
            });

            NotificationService.getInstance().notify(
              booking.getCustomer(),
              NotificationType.BOOKING_CANCELLATION,
              `Your booking reservation (ID: ${booking.getBookingId()}) has expired.`
            );
          }
        }
      });
    }, 60000);
  }
}

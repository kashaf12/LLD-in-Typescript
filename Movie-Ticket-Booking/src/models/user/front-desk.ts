import { Account } from "./account";
import { Customer } from "./customer";
import { Booking } from "../booking/booking";
import { Show } from "../show/show";
import { ShowSeat } from "../show/show-seat";

export class FrontDeskOfficer extends Account {
  private counterNumber: string;

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    counterNumber: string
  ) {
    super(id, name, email, password);
    this.counterNumber = counterNumber;
  }

  public getCounterNumber(): string {
    return this.counterNumber;
  }

  public setCounterNumber(counterNumber: string): void {
    this.counterNumber = counterNumber;
  }

  public createBooking(
    customer: Customer,
    show: Show,
    seats: ShowSeat[],
    bookingId: string
  ): Booking | null {
    try {
      for (const seat of seats) {
        if (!seat.reserve()) {
          for (const reservedSeat of seats) {
            if (reservedSeat === seat) break;
            reservedSeat.unreserve();
          }
          console.log(
            `Seat ${seat.getSeat().getSeatNumber()} is not available`
          );
          return null;
        }
      }

      const booking = new Booking(bookingId, customer, show, seats);

      customer.makeBooking(booking);

      console.log(
        `Front desk officer ${this.getName()} created booking: ${booking.getBookingId()}`
      );
      return booking;
    } catch (error) {
      console.error(`Error creating booking: ${error}`);
      return null;
    }
  }
}

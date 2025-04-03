import { Account } from "./account";
import { Booking } from "../booking/booking";
import { NotificationPreference } from "../notification/notification-preference";

export class Customer extends Account {
  private dateOfBirth: Date;
  private address: string;
  private bookings: Booking[] = [];
  private notificationPreferences: NotificationPreference[] = [];

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    dateOfBirth: Date,
    address: string
  ) {
    super(id, name, email, password);
    this.dateOfBirth = dateOfBirth;
    this.address = address;
  }

  public getDateOfBirth(): Date {
    return this.dateOfBirth;
  }

  public setDateOfBirth(dateOfBirth: Date): void {
    this.dateOfBirth = dateOfBirth;
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public makeBooking(booking: Booking): void {
    this.bookings.push(booking);
  }

  public getBookings(): Booking[] {
    return this.bookings;
  }

  public addNotificationPreference(preference: NotificationPreference): void {
    this.notificationPreferences.push(preference);
  }

  public getNotificationPreferences(): NotificationPreference[] {
    return this.notificationPreferences;
  }
}

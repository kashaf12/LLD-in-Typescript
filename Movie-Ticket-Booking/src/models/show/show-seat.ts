import { Show } from "./show";
import { Seat } from "../location/seat";

const RESERVATION_EXPIRY_MINUTES = 10; // 10 minutes reservation time

export class ShowSeat {
  private id: string;
  private show: Show;
  private seat: Seat;
  private reserved: boolean = false;
  private reservedAt: Date | null = null;
  private reservationExpiry: Date | null = null;
  private booked: boolean = false;
  private price: number;

  // For thread safety
  private lockObj: { locked: boolean } = { locked: false };

  constructor(id: string, show: Show, seat: Seat, price: number) {
    this.id = id;
    this.show = show;
    this.seat = seat;
    this.price = price;
  }

  public getId(): string {
    return this.id;
  }

  public getShow(): Show {
    return this.show;
  }

  public getSeat(): Seat {
    return this.seat;
  }

  public getPrice(): number {
    return this.price;
  }

  public isReserved(): boolean {
    if (
      this.reserved &&
      this.reservationExpiry &&
      this.reservationExpiry < new Date()
    ) {
      this.unreserve();
      return false;
    }
    return this.reserved;
  }

  public isBooked(): boolean {
    return this.booked;
  }

  // Pessimistic locking implementation for thread safety
  // Reserve a seat (with timeout)
  public reserve(): boolean {
    // Implement critical section with locking
    if (this.tryLock()) {
      try {
        // Check if seat is already reserved or booked
        if (this.isReserved() || this.isBooked()) {
          return false;
        }

        // Set reservation
        this.reserved = true;
        this.reservedAt = new Date();

        // Set expiry time (current time + reservation period)
        const expiryTime = new Date();
        expiryTime.setMinutes(
          expiryTime.getMinutes() + RESERVATION_EXPIRY_MINUTES
        );
        this.reservationExpiry = expiryTime;

        return true;
      } finally {
        this.unlock();
      }
    }

    // Could not acquire lock
    return false;
  }

  // Release a reservation
  public unreserve(): boolean {
    if (this.tryLock()) {
      try {
        // Can only unreserve if it's currently reserved and not booked
        if (!this.reserved || this.booked) {
          return false;
        }

        this.reserved = false;
        this.reservedAt = null;
        this.reservationExpiry = null;

        return true;
      } finally {
        this.unlock();
      }
    }

    return false;
  }

  // Book a seat (convert reservation to booking)
  public book(): boolean {
    if (this.tryLock()) {
      try {
        // Can only book if it's currently reserved and not already booked
        if (!this.reserved || this.booked) {
          return false;
        }

        this.booked = true;
        // Keep the reserved flag true to indicate it's taken
        // But clear the expiry time since it's now permanently booked
        this.reservationExpiry = null;

        return true;
      } finally {
        this.unlock();
      }
    }

    return false;
  }

  // Thread-safety implementation
  private tryLock(): boolean {
    // Simple implementation of mutual exclusion
    // In a real system, this would use more robust synchronization mechanisms
    if (this.lockObj.locked) {
      return false;
    }

    this.lockObj.locked = true;
    return true;
  }

  private unlock(): void {
    this.lockObj.locked = false;
  }
}

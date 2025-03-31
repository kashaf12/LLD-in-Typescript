import { ParkingSpot } from "../spots/ParkingSpot";
import { PricingStrategy } from "../interfaces/PricingStrategy";
import { Vehicle } from "../vehicles/Vehicle";
import { PaymentStatus } from "../constants/enums";

export class ParkingTicket {
  private payedAt: Date | null = null;
  private amount: number = 0;
  private isPaid: boolean = false;
  private paymentStatus: PaymentStatus = PaymentStatus.UNPAID;

  constructor(
    private ticketNumber: string,
    private issuedAt: Date,
    private parkingSpot: ParkingSpot,
    private vehicle: Vehicle
  ) {}

  getTicketNumber(): string {
    return this.ticketNumber;
  }

  getIssuedTime(): Date {
    return this.issuedAt;
  }

  getPayedAt(): Date | null {
    return this.payedAt;
  }

  calculateFee(pricingStrategy: PricingStrategy): number {
    this.amount = pricingStrategy.calculateFee(this);
    return this.amount;
  }

  markPaid(paymentTime: Date): void {
    this.isPaid = true;
    this.payedAt = paymentTime;
    this.paymentStatus = PaymentStatus.COMPLETED;
  }

  getPaymentStatus(): PaymentStatus {
    return this.paymentStatus;
  }

  getParkingSpot(): ParkingSpot {
    return this.parkingSpot;
  }

  getVehicle(): Vehicle {
    return this.vehicle;
  }

  getAmount(): number {
    return this.amount;
  }

  getDuration(): number {
    const now = this.payedAt || new Date();
    return Math.ceil(
      (now.getTime() - this.issuedAt.getTime()) / (60 * 60 * 1000)
    ); // Duration in hours
  }
}

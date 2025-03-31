import { PaymentStatus } from "../constants/enums";
import { Payment } from "../models/Payment";

export class ElectricPanel {
  private status: PaymentStatus = PaymentStatus.UNPAID;
  private startTime: Date | null = null;
  private endTime: Date | null = null;

  constructor(private id: string, private chargingRate: number) {}

  getId(): string {
    return this.id;
  }

  getStatus(): PaymentStatus {
    return this.status;
  }

  startCharging(): boolean {
    if (this.status !== PaymentStatus.UNPAID) {
      return false;
    }
    this.startTime = new Date();
    this.status = PaymentStatus.PENDING;
    return true;
  }

  stopCharging(): boolean {
    if (this.status !== PaymentStatus.PENDING) {
      return false;
    }
    this.endTime = new Date();
    return true;
  }

  calculateChargingFee(): number {
    if (!this.startTime || !this.endTime) {
      return 0;
    }

    const hours =
      (this.endTime.getTime() - this.startTime.getTime()) / (60 * 60 * 1000);
    return hours * this.chargingRate;
  }

  processPayment(payment: Payment): boolean {
    if (payment.processPayment() === PaymentStatus.COMPLETED) {
      this.status = PaymentStatus.COMPLETED;
      return true;
    }
    return false;
  }
}

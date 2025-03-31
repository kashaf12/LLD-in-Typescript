import { ParkingSpotType, PaymentStatus } from "../constants/enums";
import { ParkingTicket } from "../models/ParkingTicket";
import { Payment } from "../models/Payment";
import { ParkingFloor } from "../parking/ParkingFloor";

export class CustomerInfoPanel {
  constructor(private id: string, private floor: ParkingFloor) {}

  getId(): string {
    return this.id;
  }

  showAvailableSpots(): Map<ParkingSpotType, number> {
    return this.floor.getDisplayBoard().showAvailableSpots();
  }

  processPayment(ticket: ParkingTicket, payment: Payment): boolean {
    if (ticket.getPaymentStatus() !== PaymentStatus.UNPAID) {
      return false;
    }

    if (payment.processPayment() === PaymentStatus.COMPLETED) {
      ticket.markPaid(new Date());
      return true;
    }
    return false;
  }

  setFloor(floor: ParkingFloor): void {
    this.floor = floor;
  }
}

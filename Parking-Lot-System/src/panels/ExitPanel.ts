import { PaymentStatus } from "../constants/enums";
import { ParkingTicket } from "../models/ParkingTicket";
import { Payment } from "../models/Payment";
import { ParkingLot } from "../parking/ParkingLot";

export class ExitPanel {
  constructor(private id: string, private parkingLot: ParkingLot) {}

  getId(): string {
    return this.id;
  }

  scanTicket(ticket: ParkingTicket): number {
    const pricingStrategy = this.parkingLot.getPricingStrategy();
    return pricingStrategy.getTotalFee(ticket);
  }

  processPayment(ticket: ParkingTicket, payment: Payment): boolean {
    if (ticket.getPaymentStatus() !== PaymentStatus.UNPAID) {
      return false;
    }

    if (payment.processPayment() === PaymentStatus.COMPLETED) {
      ticket.markPaid(new Date());

      // Free up the spot
      const spot = ticket.getParkingSpot();
      spot.removeVehicle();

      // Update display boards
      this.parkingLot.updateDisplayBoards();

      this.displayMessage(`Payment successful. Thank you for visiting!`);
      return true;
    }

    this.displayMessage(`Payment failed. Please try again.`);
    return false;
  }

  displayMessage(message: string): void {
    console.log(`Exit Panel ${this.id}: ${message}`);
  }
}

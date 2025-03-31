import { PaymentStatus } from "../constants/enums";
import { ParkingTicket } from "./ParkingTicket";
import { Payment } from "./Payment";

export class ParkingAttendantPortal {
  constructor(private attendantId: string) {}

  getAttendantId(): string {
    return this.attendantId;
  }

  processTicket(ticket: ParkingTicket): ParkingTicket {
    // Additional processing logic would go here
    return ticket;
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
}

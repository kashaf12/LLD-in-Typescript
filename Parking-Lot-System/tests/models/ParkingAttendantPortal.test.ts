import {
  ParkingSpotType,
  PaymentMethod,
  PaymentStatus,
  VehicleType,
} from "../../src/constants/enums";
import { ParkingSpotFactory } from "../../src/factory/ParkingSpotFactory";
import { VehicleFactory } from "../../src/factory/VehicleFactory";
import { ParkingAttendantPortal } from "../../src/models/ParkingAttendantPortal";
import { ParkingTicket } from "../../src/models/ParkingTicket";
import { Payment } from "../../src/models/Payment";
import { CreditCardPaymentStrategy } from "../../src/strategies/payment/CreditCardPaymentStrategy";

describe("ParkingAttendantPortal", () => {
  it("should create a ParkingAttendantPortal instance with the correct attendant ID", () => {
    const attendantId = "A1";
    const portal = new ParkingAttendantPortal(attendantId);

    expect(portal.getAttendantId()).toBe(attendantId);
  });

  it("should process a parking ticket correctly", () => {
    const attendantId = "A1";
    const portal = new ParkingAttendantPortal(attendantId);
    const ticket = new ParkingTicket(
      "T1",
      new Date(),
      ParkingSpotFactory.createParkingSpot("C1", ParkingSpotType.COMPACT),
      VehicleFactory.createVehicle("ABC123", VehicleType.CAR)
    );

    const processedTicket = portal.processTicket(ticket);

    expect(processedTicket).toBe(ticket);
  });

  it("should process payment for an unpaid ticket", () => {
    const attendantId = "A1";
    const portal = new ParkingAttendantPortal(attendantId);

    const ticket = new ParkingTicket(
      "T1",
      new Date(),
      ParkingSpotFactory.createParkingSpot("C1", ParkingSpotType.COMPACT),
      VehicleFactory.createVehicle("ABC123", VehicleType.CAR)
    );
    const payment = new Payment(
      100,
      new Date(),
      PaymentStatus.UNPAID,
      PaymentMethod.CREDIT_CARD
    );

    payment.setPaymentStrategy(new CreditCardPaymentStrategy());
    const paymentResult = portal.processPayment(ticket, payment);
    ticket.markPaid(new Date());

    expect(paymentResult).toBe(true);
    expect(ticket.getPaymentStatus()).toBe(PaymentStatus.COMPLETED);
  });

  it("should not process payment for an already paid ticket", () => {
    const attendantId = "A1";
    const portal = new ParkingAttendantPortal(attendantId);
    const ticket = new ParkingTicket(
      "T1",
      new Date(),
      ParkingSpotFactory.createParkingSpot("C1", ParkingSpotType.COMPACT),
      VehicleFactory.createVehicle("ABC123", VehicleType.CAR)
    );
    const payment = new Payment(
      100,
      new Date(),
      PaymentStatus.UNPAID,
      PaymentMethod.CREDIT_CARD
    );

    ticket.markPaid(new Date());

    const paymentResult = portal.processPayment(ticket, payment);

    expect(paymentResult).toBe(false);
  });
});

import { ParkingSpotType, VehicleType } from "../../src/constants/enums";
import { ParkingSpotFactory } from "../../src/factory/ParkingSpotFactory";
import { VehicleFactory } from "../../src/factory/VehicleFactory";
import { ParkingTicket } from "../../src/models/ParkingTicket";

describe("ParkingTicket", () => {
  it("should create a ParkingTicket instance with the correct properties", () => {
    const ticketId = "T1";
    const issueDate = new Date();
    const parkingSpot = ParkingSpotFactory.createParkingSpot(
      "C1",
      ParkingSpotType.COMPACT
    );

    const vehicle = VehicleFactory.createVehicle("ABC123", VehicleType.CAR);

    const ticket = new ParkingTicket(ticketId, issueDate, parkingSpot, vehicle);

    expect(ticket.getTicketNumber()).toBe(ticketId);
    expect(ticket.getIssuedTime()).toBe(issueDate);
    expect(ticket.getParkingSpot()).toEqual(parkingSpot);
    expect(ticket.getVehicle()).toEqual(vehicle);
  });

  it("should mark the ticket as paid and set the payment date", () => {
    const ticketId = "T1";
    const issueDate = new Date();
    const parkingSpot = ParkingSpotFactory.createParkingSpot(
      "C1",
      ParkingSpotType.COMPACT
    );
    const vehicle = VehicleFactory.createVehicle("ABC123", VehicleType.CAR);

    const ticket = new ParkingTicket(ticketId, issueDate, parkingSpot, vehicle);

    expect(ticket.getPaymentStatus()).toBe("UNPAID");

    const paymentDate = new Date();
    ticket.markPaid(paymentDate);

    expect(ticket.getPaymentStatus()).toBe("COMPLETED");
    expect(ticket.getPayedAt()).toBe(paymentDate);
  });
});

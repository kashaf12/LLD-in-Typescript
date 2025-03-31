import { ParkingTicket } from "../models/ParkingTicket";
import { ParkingLot } from "../parking/ParkingLot";
import { Vehicle } from "../vehicles/Vehicle";

export class EntryPanel {
  private ticketCounter: number = 0;

  constructor(private id: string, private parkingLot: ParkingLot) {}

  getId(): string {
    return this.id;
  }

  isParkingFull(): boolean {
    return this.parkingLot.isParkingFull();
  }

  displayMessage(message: string): void {
    console.log(`Entry Panel ${this.id}: ${message}`);
  }

  printTicket(vehicle: Vehicle): ParkingTicket | null {
    if (this.isParkingFull()) {
      this.displayMessage("Parking is full!");
      return null;
    }

    // Find available spot nearest to exit
    const availableSpot = this.parkingLot.getAvailableSpot(vehicle.getType());
    if (!availableSpot) {
      this.displayMessage("No suitable parking spot available!");
      return null;
    }

    // Create new ticket
    const ticketNumber = `TKT-${this.id}-${++this.ticketCounter}`;
    const ticket = new ParkingTicket(
      ticketNumber,
      new Date(),
      availableSpot,
      vehicle
    );

    // Assign ticket to vehicle and spot to vehicle
    vehicle.assignTicket(ticket);
    availableSpot.assignVehicle(vehicle);

    // Update display boards
    this.parkingLot.updateDisplayBoards();

    this.displayMessage(`Please park at spot ${availableSpot.getNumber()}`);
    return ticket;
  }
}

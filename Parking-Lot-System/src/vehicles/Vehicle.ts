import { VehicleType } from "../constants/enums";
import { ParkingTicket } from "../models/ParkingTicket";

export abstract class Vehicle {
  private ticket: ParkingTicket | null = null;

  constructor(private licenseNumber: string, private type: VehicleType) {}

  assignTicket(ticket: ParkingTicket): void {
    this.ticket = ticket;
  }

  getTicket(): ParkingTicket | null {
    return this.ticket;
  }

  getLicenseNumber(): string {
    return this.licenseNumber;
  }

  getType(): VehicleType {
    return this.type;
  }
}

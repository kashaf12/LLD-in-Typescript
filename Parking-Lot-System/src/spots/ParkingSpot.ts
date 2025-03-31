import { ParkingSpotType } from "../constants/enums";
import { Vehicle } from "../vehicles/Vehicle";

export abstract class ParkingSpot {
  private vehicle: Vehicle | null = null;

  constructor(
    private number: string,
    private type: ParkingSpotType,
    private isOccupied: boolean = false
  ) {}

  getNumber(): string {
    return this.number;
  }

  getVehicle(): Vehicle | null {
    return this.vehicle;
  }

  getType(): ParkingSpotType {
    return this.type;
  }

  isSpotOccupied(): boolean {
    return this.isOccupied;
  }

  assignVehicle(vehicle: Vehicle): boolean {
    if (this.isOccupied) {
      return false;
    }
    this.vehicle = vehicle;
    this.isOccupied = true;
    return true;
  }

  removeVehicle(): boolean {
    if (!this.isOccupied) {
      return false;
    }
    this.vehicle = null;
    this.isOccupied = false;
    return true;
  }
}

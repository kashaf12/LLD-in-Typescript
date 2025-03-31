import { VehicleType } from "../constants/enums";
import { Vehicle } from "./Vehicle";

export class Truck extends Vehicle {
  constructor(licenseNumber: string) {
    super(licenseNumber, VehicleType.TRUCK);
  }
}

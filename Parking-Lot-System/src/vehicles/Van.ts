import { VehicleType } from "../constants/enums";
import { Vehicle } from "./Vehicle";

export class Van extends Vehicle {
  constructor(licenseNumber: string) {
    super(licenseNumber, VehicleType.VAN);
  }
}

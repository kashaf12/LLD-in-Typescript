import { VehicleType } from "../constants/enums";
import { Vehicle } from "./Vehicle";

export class MotorBike extends Vehicle {
  constructor(licenseNumber: string) {
    super(licenseNumber, VehicleType.MOTORBIKE);
  }
}

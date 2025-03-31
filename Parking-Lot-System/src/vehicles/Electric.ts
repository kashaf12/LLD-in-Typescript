import { VehicleType } from "../constants/enums";
import { Vehicle } from "./Vehicle";

export class Electric extends Vehicle {
  constructor(licenseNumber: string) {
    super(licenseNumber, VehicleType.ELECTRIC);
  }
}

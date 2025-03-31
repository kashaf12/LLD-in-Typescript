import { VehicleType } from "../constants/enums";
import { Vehicle } from "./Vehicle";

export class Car extends Vehicle {
  constructor(licenseNumber: string) {
    super(licenseNumber, VehicleType.CAR);
  }
}

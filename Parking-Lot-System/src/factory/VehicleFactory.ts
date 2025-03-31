import { VehicleType } from "../constants/enums";
import { Car } from "../vehicles/Car";
import { Electric } from "../vehicles/Electric";
import { MotorBike } from "../vehicles/MotorBike";
import { Truck } from "../vehicles/Truck";
import { Van } from "../vehicles/Van";
import { Vehicle } from "../vehicles/Vehicle";

export class VehicleFactory {
  static createVehicle(licenseNumber: string, type: VehicleType): Vehicle {
    switch (type) {
      case VehicleType.CAR:
        return new Car(licenseNumber);
      case VehicleType.TRUCK:
        return new Truck(licenseNumber);
      case VehicleType.MOTORBIKE:
        return new MotorBike(licenseNumber);
      case VehicleType.VAN:
        return new Van(licenseNumber);
      case VehicleType.ELECTRIC:
        return new Electric(licenseNumber);
      default:
        throw new Error("Invalid vehicle type");
    }
  }
}

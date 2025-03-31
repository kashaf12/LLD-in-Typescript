import { ParkingSpotType } from "../constants/enums";
import { CompactSpot } from "../spots/CompactSpot";
import { ElectricSpot } from "../spots/ElectricSpot";
import { HandicappedSpot } from "../spots/HandicappedSpot";
import { LargeSpot } from "../spots/LargeSpot";
import { MotorBikeSpot } from "../spots/MotorbikeSpot";
import { ParkingSpot } from "../spots/ParkingSpot";

export class ParkingSpotFactory {
  static createParkingSpot(
    number: string,
    type: ParkingSpotType,
    isOccupied = false
  ): ParkingSpot {
    switch (type) {
      case ParkingSpotType.COMPACT:
        return new CompactSpot(number, isOccupied);
      case ParkingSpotType.LARGE:
        return new LargeSpot(number, isOccupied);
      case ParkingSpotType.MOTORBIKE:
        return new MotorBikeSpot(number, isOccupied);
      case ParkingSpotType.HANDICAPPED:
        return new HandicappedSpot(number, isOccupied);
      case ParkingSpotType.ELECTRIC:
        return new ElectricSpot(number, isOccupied);
      default:
        throw new Error("Invalid parking spot type");
    }
  }
}

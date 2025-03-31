import { ParkingSpotType } from "../constants/enums";
import { ParkingSpot } from "./ParkingSpot";

export class MotorBikeSpot extends ParkingSpot {
  constructor(number: string, isOccupied: boolean = false) {
    super(number, ParkingSpotType.MOTORBIKE, isOccupied);
  }
}

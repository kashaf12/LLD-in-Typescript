import { ParkingSpotType } from "../constants/enums";
import { ParkingSpot } from "./ParkingSpot";

export class HandicappedSpot extends ParkingSpot {
  constructor(number: string, isOccupied: boolean = false) {
    super(number, ParkingSpotType.HANDICAPPED, isOccupied);
  }
}

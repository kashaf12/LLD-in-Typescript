import { ParkingSpotType } from "../constants/enums";
import { ParkingSpot } from "./ParkingSpot";

export class CompactSpot extends ParkingSpot {
  constructor(number: string, isOccupied: boolean = false) {
    super(number, ParkingSpotType.COMPACT, isOccupied);
  }
}

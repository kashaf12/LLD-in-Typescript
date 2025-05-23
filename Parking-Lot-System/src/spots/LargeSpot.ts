import { ParkingSpotType } from "../constants/enums";
import { ParkingSpot } from "./ParkingSpot";

export class LargeSpot extends ParkingSpot {
  constructor(number: string, isOccupied: boolean = false) {
    super(number, ParkingSpotType.LARGE, isOccupied);
  }
}

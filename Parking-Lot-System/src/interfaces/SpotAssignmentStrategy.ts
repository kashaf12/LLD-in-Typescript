import { VehicleType } from "../constants/enums";
import { ParkingSpot } from "../spots/ParkingSpot";

export interface SpotAssignmentStrategy {
  findSpot(spots: ParkingSpot[], vehicleType: VehicleType): ParkingSpot | null;
}

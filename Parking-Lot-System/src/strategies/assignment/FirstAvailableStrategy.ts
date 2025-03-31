import { ParkingSpot } from "../../spots/ParkingSpot";
import { SpotAssignmentStrategy } from "../../interfaces/SpotAssignmentStrategy";
import { VehicleType } from "../../constants/enums";

export class FirstAvailableStrategy implements SpotAssignmentStrategy {
  findSpot(spots: ParkingSpot[], vehicleType: VehicleType): ParkingSpot | null {
    if (spots.length === 0) {
      return null;
    }

    // Simply return the first available spot
    return spots[0];
  }
}

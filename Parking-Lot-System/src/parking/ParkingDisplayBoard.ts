import { ParkingSpotType } from "../constants/enums";

export class ParkingDisplayBoard {
  constructor(
    private id: string,
    private availableSpotCount: Map<ParkingSpotType, number>
  ) {}

  showAvailableSpots(): Map<ParkingSpotType, number> {
    console.log(`Available spots on display board ${this.id}:`);
    this.availableSpotCount.forEach((count, type) => {
      console.log(`Available spots of type ${type}: ${count}`);
    });
    return this.availableSpotCount;
  }

  updateAvailableSpots(spotType: ParkingSpotType, count: number): void {
    this.availableSpotCount.set(spotType, count);
  }
}

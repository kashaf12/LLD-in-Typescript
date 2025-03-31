import { ParkingSpotType, VehicleType } from "../constants/enums";
import { SpotAssignmentStrategy } from "../interfaces/SpotAssignmentStrategy";
import { CustomerInfoPanel } from "../panels/CustomerInfoPanel";
import { ParkingSpot } from "../spots/ParkingSpot";
import { Vehicle } from "../vehicles/Vehicle";
import { ParkingDisplayBoard } from "./ParkingDisplayBoard";

export class ParkingFloor {
  private availableSpots: number;

  constructor(
    private name: string,
    private parkingSpots: ParkingSpot[],
    private displayBoard: ParkingDisplayBoard,
    private infoPanel: CustomerInfoPanel,
    private capacity: number
  ) {
    this.availableSpots = capacity;
    this.updateDisplayBoard();
  }

  getName(): string {
    return this.name;
  }

  getCustomerInfoPanel(): CustomerInfoPanel {
    return this.infoPanel;
  }

  getCapacity(): number {
    return this.capacity;
  }

  getAvailableSpots(): number {
    return this.availableSpots;
  }

  getDisplayBoard(): ParkingDisplayBoard {
    return this.displayBoard;
  }

  isParkingFull(): boolean {
    return this.availableSpots === 0;
  }

  updateDisplayBoard(): void {
    const spotCounts = new Map<ParkingSpotType, number>();

    Object.values(ParkingSpotType).forEach((type) => {
      spotCounts.set(type, 0);
    });

    this.parkingSpots.forEach((spot) => {
      if (!spot.isSpotOccupied()) {
        const type = spot.getType();
        const currentCount = spotCounts.get(type) || 0;
        spotCounts.set(type, currentCount + 1);
      }
    });

    Object.values(ParkingSpotType).forEach((type) => {
      this.displayBoard.updateAvailableSpots(type, spotCounts.get(type) || 0);
    });
  }

  addParkingSpot(spot: ParkingSpot): boolean {
    this.parkingSpots.push(spot);
    this.capacity++;
    this.availableSpots++;
    this.updateDisplayBoard();
    return true;
  }

  getAvailableSpotsByType(type: VehicleType): ParkingSpot[] {
    let compatibleSpotTypes: ParkingSpotType[] = [];

    switch (type) {
      case VehicleType.MOTORBIKE:
        compatibleSpotTypes = [ParkingSpotType.MOTORBIKE];
        break;
      case VehicleType.CAR:
        compatibleSpotTypes = [ParkingSpotType.COMPACT, ParkingSpotType.LARGE];
        break;
      case VehicleType.ELECTRIC:
        compatibleSpotTypes = [ParkingSpotType.ELECTRIC];
        break;
      case VehicleType.VAN:
      case VehicleType.TRUCK:
        compatibleSpotTypes = [ParkingSpotType.LARGE];
        break;
    }

    return this.parkingSpots.filter(
      (spot) =>
        !spot.isSpotOccupied() && compatibleSpotTypes.includes(spot.getType())
    );
  }

  getAvailableSpot(
    vehicleType: VehicleType,
    strategy: SpotAssignmentStrategy
  ): ParkingSpot | null {
    const availableSpots = this.getAvailableSpotsByType(vehicleType);
    return strategy.findSpot(availableSpots, vehicleType);
  }

  assignVehicle(vehicle: Vehicle, spot: ParkingSpot): boolean {
    if (spot.assignVehicle(vehicle)) {
      this.availableSpots--;
      this.updateDisplayBoard();
      return true;
    }
    return false;
  }

  freeSpot(spot: ParkingSpot): boolean {
    if (spot.removeVehicle()) {
      this.availableSpots++;
      this.updateDisplayBoard();
      return true;
    }
    return false;
  }

  checkSpotNumberExists(spotNumber: string): boolean {
    return this.parkingSpots.some((spot) => spot.getNumber() === spotNumber);
  }

  getSpotByNumber(spotNumber: string): ParkingSpot | null {
    const spot = this.parkingSpots.find(
      (spot) => spot.getNumber() === spotNumber
    );
    return spot || null;
  }
}

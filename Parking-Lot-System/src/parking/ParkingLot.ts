import { VehicleType } from "../constants/enums";
import { PricingStrategy } from "../interfaces/PricingStrategy";
import { SpotAssignmentStrategy } from "../interfaces/SpotAssignmentStrategy";
import { Address } from "../models/Address";
import { EntryPanel } from "../panels/EntryPanel";
import { ExitPanel } from "../panels/ExitPanel";
import { ParkingSpot } from "../spots/ParkingSpot";
import { FirstAvailableStrategy } from "../strategies/assignment/FirstAvailableStrategy";
import { HourlyPricingStrategy } from "../strategies/pricing/HourlyPricingStrategy";
import { ParkingFloor } from "./ParkingFloor";

export class ParkingLot {
  constructor(
    private name: string,
    private address: Address,
    private floors: ParkingFloor[],
    private entryPanels: EntryPanel[],
    private exitPanels: ExitPanel[],
    private pricingStrategy: PricingStrategy = new HourlyPricingStrategy(
      4,
      2,
      1
    ),
    private capacity: number,
    private spotAssignmentStrategy: SpotAssignmentStrategy = new FirstAvailableStrategy()
  ) {}

  getName(): string {
    return this.name;
  }

  getAddress(): Address {
    return this.address;
  }

  getPricingStrategy(): PricingStrategy {
    return this.pricingStrategy;
  }
  getSpotAssignmentStrategy(): SpotAssignmentStrategy {
    return this.spotAssignmentStrategy;
  }

  setSpotAssignmentStrategy(strategy: SpotAssignmentStrategy): void {
    this.spotAssignmentStrategy = strategy;
  }

  isParkingFull(): boolean {
    return this.floors.every((floor) => floor.isParkingFull());
  }

  getAvailableSpot(vehicleType: VehicleType): ParkingSpot | null {
    for (const floor of this.floors) {
      const spot = floor.getAvailableSpot(
        vehicleType,
        this.spotAssignmentStrategy
      );
      if (spot) {
        return spot;
      }
    }
    return null;
  }

  updateDisplayBoards(): void {
    this.floors.forEach((floor) => floor.updateDisplayBoard());
  }

  addFloor(floor: ParkingFloor): void {
    this.floors.push(floor);
    this.capacity += floor.getCapacity();
  }

  getFloors(): ParkingFloor[] {
    return this.floors;
  }

  removeFloor(floor: ParkingFloor): boolean {
    const index = this.floors.indexOf(floor);
    if (index !== -1) {
      this.capacity -= floor.getCapacity();
      this.floors.splice(index, 1);
      return true;
    }
    return false;
  }

  addEntryPanel(entryPanel: EntryPanel): void {
    this.entryPanels.push(entryPanel);
  }

  addExitPanel(exitPanel: ExitPanel): void {
    this.exitPanels.push(exitPanel);
  }

  checkFloorNameExists(floorName: string): boolean {
    return this.floors.some((floor) => floor.getName() === floorName);
  }

  getFloorByName(floorName: string): ParkingFloor | null {
    const floor = this.floors.find((floor) => floor.getName() === floorName);
    return floor || null;
  }

  getEntryPanels(): EntryPanel[] {
    return this.entryPanels;
  }
  getExitPanels(): ExitPanel[] {
    return this.exitPanels;
  }
}

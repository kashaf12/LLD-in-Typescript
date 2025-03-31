import { ParkingSpotType, PaymentStatus } from "../constants/enums";
import { ElectricPanel } from "../panels/ElectricPanel";
import { ParkingSpot } from "./ParkingSpot";

export class ElectricSpot extends ParkingSpot {
  private chargingPanel: ElectricPanel | null;

  constructor(number: string, isOccupied: boolean = false) {
    super(number, ParkingSpotType.ELECTRIC, isOccupied);
    this.chargingPanel = null;
  }

  setChargingPanel(chargingPanel: ElectricPanel): void {
    this.chargingPanel = chargingPanel;
  }

  hasChargingPanel(): boolean {
    return this.chargingPanel !== null;
  }

  getChargingPanelId(): string {
    if (!this.hasChargingPanel()) {
      throw new Error("Charging panel is not set.");
    }
    return this.chargingPanel!.getId();
  }

  getChargingPanel(): ElectricPanel {
    if (!this.hasChargingPanel()) {
      throw new Error("Charging panel is not set.");
    }
    return this.chargingPanel!;
  }

  getChargingStatus(): PaymentStatus {
    if (!this.hasChargingPanel()) {
      throw new Error("Charging panel is not set.");
    }
    return this.chargingPanel!.getStatus();
  }

  startCharging(): boolean {
    if (!this.hasChargingPanel()) {
      throw new Error("Charging panel is not set.");
    }
    return this.chargingPanel!.startCharging();
  }

  stopCharging(): boolean {
    if (!this.hasChargingPanel()) {
      throw new Error("Charging panel is not set.");
    }
    return this.chargingPanel!.stopCharging();
  }
}

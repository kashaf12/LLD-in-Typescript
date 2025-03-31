import { AccountType } from "../constants/enums";
import { Account } from "../models/Account";
import { EntryPanel } from "../panels/EntryPanel";
import { ExitPanel } from "../panels/ExitPanel";
import { ParkingFloor } from "../parking/ParkingFloor";
import { ParkingLot } from "../parking/ParkingLot";
import { ParkingSpot } from "../spots/ParkingSpot";

export class Admin extends Account {
  constructor(username: string, password: string) {
    super(username, password, AccountType.ADMIN);
  }

  public addParkingFloor(
    parkingLot: ParkingLot,
    parkingFloor: ParkingFloor
  ): boolean {
    const floor = parkingLot.checkFloorNameExists(parkingFloor.getName());
    if (!floor) {
      parkingLot.addFloor(parkingFloor);
      return true;
    }
    return false;
  }

  public addParkingSpot(
    parkingLot: ParkingLot,
    parkingFloorName: string,
    parkingSpot: ParkingSpot
  ) {
    const floor = parkingLot.getFloorByName(parkingFloorName);

    if (!floor) {
      throw new Error("Invalid floor");
    }

    const spot = floor.getSpotByNumber(parkingSpot.getNumber());
    if (spot) {
      return;
    }

    floor.addParkingSpot(parkingSpot);
  }

  public addEntrancePanel(parkingLot: ParkingLot, entryPanel: EntryPanel) {
    const listOfEntryPanel = parkingLot.getEntryPanels();

    const result = listOfEntryPanel.find(
      (panel) => panel.getId() === entryPanel.getId()
    );

    if (result === undefined) {
      listOfEntryPanel.push(entryPanel);
      return true;
    }
    return false;
  }

  public addExitPanel(parkingLot: ParkingLot, exitPanel: ExitPanel) {
    const listOfExistPanel = parkingLot.getExitPanels();
    const result = listOfExistPanel.find(
      (panel) => panel.getId() === exitPanel.getId()
    );

    if (result === undefined) {
      listOfExistPanel.push(exitPanel);
      return true;
    }
    return false;
  }
}

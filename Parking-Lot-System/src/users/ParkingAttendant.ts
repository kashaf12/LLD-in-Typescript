import { AccountType } from "../constants/enums";
import { Account } from "../models/Account";

export class ParkingAttendant extends Account {
  constructor(username: string, password: string) {
    super(username, password, AccountType.ATTENDANT);
  }

  public processTicket(): boolean {
    return false;
  }
}

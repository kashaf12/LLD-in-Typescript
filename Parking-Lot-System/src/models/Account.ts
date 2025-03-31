import { AccountType } from "../constants/enums";

export abstract class Account {
  constructor(
    private username: string,
    private password: string,
    private accountType: AccountType
  ) {}

  resetPassword(newPassword: string): boolean {
    // Password validation logic would go here
    this.password = newPassword;
    return true;
  }

  getAccountType(): AccountType {
    return this.accountType;
  }
}

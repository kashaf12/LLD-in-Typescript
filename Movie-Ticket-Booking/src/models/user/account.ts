import { AccountStatus } from "../../types/enums";

export abstract class Account {
  private id: string;
  private name: string;
  private email: string;
  private password: string;
  private status: AccountStatus;

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.status = AccountStatus.ACTIVE;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getStatus(): AccountStatus {
    return this.status;
  }

  public setStatus(status: AccountStatus): void {
    this.status = status;
  }

  public login(email: string, password: string): boolean {
    return (
      this.email === email &&
      this.password === password &&
      this.status === AccountStatus.ACTIVE
    );
  }

  public resetPassword(): boolean {
    return true;
  }
}

import { Customer } from "./customer";

export class Guest {
  private sessionId: string;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public registerAccount(
    id: string,
    name: string,
    email: string,
    password: string,
    dateOfBirth: Date,
    address: string
  ): Customer {
    const customer = new Customer(
      id,
      name,
      email,
      password,
      dateOfBirth,
      address
    );

    console.log(
      `Guest with session ${this.sessionId} registered as customer: ${email}`
    );
    return customer;
  }
}

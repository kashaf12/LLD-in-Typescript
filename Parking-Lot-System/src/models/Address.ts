export class Address {
  constructor(
    private street: string,
    private city: string,
    private state: string,
    private zipCode: string,
    private country: string
  ) {}

  getFullAddress(): string {
    return `${this.street}, ${this.city}, ${this.state} ${this.zipCode}, ${this.country}`;
  }
}

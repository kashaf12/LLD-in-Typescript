import { Theatre } from "./theatre";

export class City {
  private cityId: string;
  private name: string;
  private state: string;
  private zipCode: string;
  private theatres: Theatre[] = [];

  constructor(cityId: string, name: string, state: string, zipCode: string) {
    this.cityId = cityId;
    this.name = name;
    this.state = state;
    this.zipCode = zipCode;
  }

  public getCityId(): string {
    return this.cityId;
  }

  public getName(): string {
    return this.name;
  }

  public getState(): string {
    return this.state;
  }

  public getZipCode(): string {
    return this.zipCode;
  }

  public addTheatre(theatre: Theatre): void {
    this.theatres.push(theatre);
  }

  public removeTheatre(theatre: Theatre): boolean {
    const index = this.theatres.indexOf(theatre);
    if (index !== -1) {
      this.theatres.splice(index, 1);
      return true;
    }
    return false;
  }

  public getTheatres(): Theatre[] {
    return this.theatres;
  }
}

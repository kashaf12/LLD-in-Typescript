import { City } from "./city";
import { Screen } from "./screen";
import { Show } from "../show/show";

export class Theatre {
  private theatreId: string;
  private name: string;
  private address: string;
  private city: City;
  private screens: Screen[] = [];

  constructor(theatreId: string, name: string, address: string, city: City) {
    this.theatreId = theatreId;
    this.name = name;
    this.address = address;
    this.city = city;

    city.addTheatre(this);
  }

  public getTheatreId(): string {
    return this.theatreId;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getAddress(): string {
    return this.address;
  }

  public setAddress(address: string): void {
    this.address = address;
  }

  public getCity(): City {
    return this.city;
  }

  public addScreen(screen: Screen): boolean {
    this.screens.push(screen);
    return true;
  }

  public getScreens(): Screen[] {
    return this.screens;
  }

  public getShows(): Show[] {
    let allShows: Show[] = [];

    for (const screen of this.screens) {
      allShows = allShows.concat(screen.getShows());
    }

    return allShows;
  }
}

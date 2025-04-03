import { Theatre } from "./theatre";
import { Seat } from "./seat";
import { Show } from "../show/show";

export class Screen {
  private screenId: string;
  private name: string;
  private theatre: Theatre;
  private totalSeats: number;
  private seats: Seat[] = [];
  private shows: Show[] = [];

  constructor(
    screenId: string,
    name: string,
    theatre: Theatre,
    totalSeats: number
  ) {
    this.screenId = screenId;
    this.name = name;
    this.theatre = theatre;
    this.totalSeats = totalSeats;

    theatre.addScreen(this);
  }

  public getScreenId(): string {
    return this.screenId;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getTheatre(): Theatre {
    return this.theatre;
  }

  public getTotalSeats(): number {
    return this.totalSeats;
  }

  public addSeat(seat: Seat): void {
    this.seats.push(seat);
  }

  public getSeats(): Seat[] {
    return this.seats;
  }

  public addShow(show: Show): boolean {
    // Check if there's any time conflict with existing shows
    for (const existingShow of this.shows) {
      if (this.hasTimeConflict(existingShow, show)) {
        console.log(
          `Show time conflicts with existing show in screen ${this.name}`
        );
        return false;
      }
    }

    this.shows.push(show);
    return true;
  }

  public getShows(): Show[] {
    return this.shows;
  }

  private hasTimeConflict(show1: Show, show2: Show): boolean {
    return (
      (show1.getStartTime() <= show2.getStartTime() &&
        show2.getStartTime() < show1.getEndTime()) ||
      (show2.getStartTime() <= show1.getStartTime() &&
        show1.getStartTime() < show2.getEndTime())
    );
  }
}

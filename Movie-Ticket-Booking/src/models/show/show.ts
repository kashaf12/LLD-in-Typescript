import { Movie } from "./movie";
import { Screen } from "../location/screen";
import { ShowSeat } from "./show-seat";

export class Show {
  private showId: string;
  private startTime: Date;
  private endTime: Date;
  private movie: Movie;
  private screen: Screen;
  private basePrice: number;
  private showSeats: ShowSeat[] = [];

  constructor(
    showId: string,
    startTime: Date,
    movie: Movie,
    screen: Screen,
    basePrice: number
  ) {
    this.showId = showId;
    this.startTime = startTime;
    this.endTime = new Date(
      startTime.getTime() + movie.getDurationMins() * 60000
    );
    this.movie = movie;
    this.screen = screen;
    this.basePrice = basePrice;

    movie.addShow(this);

    if (!screen.addShow(this)) {
      throw new Error("Cannot add show to screen due to time conflict");
    }

    this.initializeShowSeats();
  }

  public getShowId(): string {
    return this.showId;
  }

  public getStartTime(): Date {
    return this.startTime;
  }

  public setStartTime(startTime: Date): void {
    this.startTime = startTime;
    this.endTime = new Date(
      startTime.getTime() + this.movie.getDurationMins() * 60000
    );
  }

  public getEndTime(): Date {
    return this.endTime;
  }

  public getMovie(): Movie {
    return this.movie;
  }

  public getScreen(): Screen {
    return this.screen;
  }

  public getBasePrice(): number {
    return this.basePrice;
  }

  public setBasePrice(basePrice: number): void {
    this.basePrice = basePrice;
  }

  private initializeShowSeats(): void {
    const seats = this.screen.getSeats();

    for (const seat of seats) {
      // Create a show seat for each seat in the screen
      const showSeat = new ShowSeat(
        `${this.showId}_${seat.getSeatId()}`,
        this,
        seat,
        this.calculateSeatPrice(seat.getBasePrice())
      );

      this.showSeats.push(showSeat);
    }
  }

  public getShowSeats(): ShowSeat[] {
    return this.showSeats;
  }

  public getAvailableSeats(): ShowSeat[] {
    return this.showSeats.filter(
      (seat) => !seat.isReserved() && !seat.isBooked()
    );
  }

  private calculateSeatPrice(seatBasePrice: number): number {
    // In a real system, this could include logic for:
    // - Premium pricing for weekend/holiday shows
    // - Discounts for morning/afternoon shows
    // - Additional charges for premium seats
    return seatBasePrice + this.basePrice;
  }
}

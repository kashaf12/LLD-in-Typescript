import { Screen } from "./screen";
import { SeatType } from "../../types/enums";

export class Seat {
  private seatId: string;
  private seatNumber: string; // e.g., "A1", "B5", etc.
  private type: SeatType;
  private screen: Screen;
  private basePrice: number;

  constructor(
    seatId: string,
    seatNumber: string,
    type: SeatType,
    screen: Screen,
    basePrice: number
  ) {
    this.seatId = seatId;
    this.seatNumber = seatNumber;
    this.type = type;
    this.screen = screen;
    this.basePrice = basePrice;

    screen.addSeat(this);
  }

  public getSeatId(): string {
    return this.seatId;
  }

  public getSeatNumber(): string {
    return this.seatNumber;
  }

  public getType(): SeatType {
    return this.type;
  }

  public setType(type: SeatType): void {
    this.type = type;
  }

  public getScreen(): Screen {
    return this.screen;
  }

  public getBasePrice(): number {
    return this.basePrice;
  }

  public setBasePrice(price: number): void {
    this.basePrice = price;
  }
}

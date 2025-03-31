import { ParkingTicket } from "../../models/ParkingTicket";
import { PricingStrategy } from "../../interfaces/PricingStrategy";
import { VehicleType } from "../../constants/enums";

export class HourlyPricingStrategy implements PricingStrategy {
  constructor(
    private firstHourRate: number,
    private secondThirdHourRate: number,
    private subsequentHourRate: number,
    private vehicleTypeSurcharge: Map<VehicleType, number> = new Map(),
    private taxRate: number = 0.1 // 10% tax
  ) {}

  calculateFee(ticket: ParkingTicket): number {
    const hours = ticket.getDuration();
    let fee = 0;

    if (hours <= 1) {
      fee = this.firstHourRate;
    } else if (hours <= 3) {
      fee = this.firstHourRate + (hours - 1) * this.secondThirdHourRate;
    } else {
      fee =
        this.firstHourRate +
        2 * this.secondThirdHourRate +
        (hours - 3) * this.subsequentHourRate;
    }

    // Add vehicle type surcharge if applicable
    const vehicleType = ticket.getVehicle().getType();
    const surcharge = this.vehicleTypeSurcharge.get(vehicleType) || 0;
    fee += surcharge;

    return fee;
  }

  calculateTax(amount: number): number {
    return amount * this.taxRate;
  }

  getTotalFee(ticket: ParkingTicket): number {
    const fee = this.calculateFee(ticket);
    const tax = this.calculateTax(fee);
    return fee + tax;
  }
}

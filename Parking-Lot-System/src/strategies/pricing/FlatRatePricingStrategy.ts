import { ParkingTicket } from "../../models/ParkingTicket";
import { PricingStrategy } from "../../interfaces/PricingStrategy";
import { VehicleType } from "../../constants/enums";

export class FlatRatePricingStrategy implements PricingStrategy {
  constructor(
    private dailyRate: number,
    private vehicleTypeSurcharge: Map<VehicleType, number>,
    private taxRate: number = 0.1 // 10% tax
  ) {}

  calculateFee(ticket: ParkingTicket): number {
    const hours = ticket.getDuration();
    // Calculate days (or part thereof)
    const days = Math.ceil(hours / 24);
    let fee = days * this.dailyRate;

    // Add vehicle type surcharge if applicable
    const vehicleType = ticket.getVehicle().getType();
    const surcharge = this.vehicleTypeSurcharge.get(vehicleType) || 0;
    fee += surcharge * days; // Apply surcharge per day

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

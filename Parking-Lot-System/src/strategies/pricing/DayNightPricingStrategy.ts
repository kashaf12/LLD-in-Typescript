import { ParkingTicket } from "../../models/ParkingTicket";
import { PricingStrategy } from "../../interfaces/PricingStrategy";
import { VehicleType } from "../../constants/enums";

export class DayNightPricingStrategy implements PricingStrategy {
  constructor(
    private dayRate: number, // Rate per hour during day (e.g., 8AM-8PM)
    private nightRate: number, // Rate per hour during night (e.g., 8PM-8AM)
    private vehicleTypeSurcharge: Map<VehicleType, number>,
    private taxRate: number = 0.1, // 10% tax
    private dayStartHour: number = 8, // 8AM
    private nightStartHour: number = 20 // 8PM
  ) {}

  calculateFee(ticket: ParkingTicket): number {
    const entryTime = ticket.getIssuedTime();
    const exitTime = ticket.getPayedAt() || new Date();
    let fee = 0;

    // Calculate hours spent in day and night
    // This is a simplified implementation - a real one would account for multiple days
    let currentTime = new Date(entryTime.getTime());

    while (currentTime < exitTime) {
      const hour = currentTime.getHours();
      if (hour >= this.dayStartHour && hour < this.nightStartHour) {
        // Day rate
        fee += this.dayRate;
      } else {
        // Night rate
        fee += this.nightRate;
      }

      // Move to next hour
      currentTime.setHours(currentTime.getHours() + 1);

      // If we've moved past exit time, prorate the last hour
      if (currentTime > exitTime) {
        const minutes = 60 - (currentTime.getMinutes() - exitTime.getMinutes());
        const hoursProration = minutes / 60;

        if (hour >= this.dayStartHour && hour < this.nightStartHour) {
          fee -= this.dayRate * (1 - hoursProration);
        } else {
          fee -= this.nightRate * (1 - hoursProration);
        }
      }
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

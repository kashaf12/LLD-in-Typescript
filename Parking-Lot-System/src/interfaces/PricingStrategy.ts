import { ParkingTicket } from "../models/ParkingTicket";

export interface PricingStrategy {
  calculateFee(ticket: ParkingTicket): number;
  calculateTax(amount: number): number;
  getTotalFee(ticket: ParkingTicket): number;
}

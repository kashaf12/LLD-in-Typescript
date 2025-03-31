import { ParkingSpotType } from "../../src/constants/enums";
import { ElectricSpot } from "../../src/spots/ElectricSpot";

describe("ElectricSpot", () => {
  it("should create a ElectricSpot instance with the correct ID and availability", () => {
    const parkingSpotID = "C1";
    const isSpotAvailable = true;

    const electricSpot = new ElectricSpot(parkingSpotID, isSpotAvailable);

    expect(electricSpot.getNumber()).toBe(parkingSpotID);
    expect(electricSpot.isSpotOccupied()).toBe(isSpotAvailable);
    expect(electricSpot.getType()).toBe(ParkingSpotType.ELECTRIC);
  });

  it("should create a ElectricSpot instance with default availability as true", () => {
    const parkingSpotID = "C2";

    const electricSpot = new ElectricSpot(parkingSpotID);

    expect(electricSpot.getNumber()).toBe(parkingSpotID);
    expect(electricSpot.isSpotOccupied()).toBe(false);
  });

  it("should return the correct parking spot type when not available", () => {
    const parkingSpotID = "C4";
    const isSpotAvailable = false;

    const electricSpot = new ElectricSpot(parkingSpotID, isSpotAvailable);

    expect(electricSpot.getType()).toBe(ParkingSpotType.ELECTRIC);
  });
});

import { ParkingSpotType } from "../../src/constants/enums";
import { LargeSpot } from "../../src/spots/LargeSpot";

describe("LargeSpot", () => {
  it("should create a LargeSpot instance with the correct ID and availability", () => {
    const parkingSpotID = "C1";
    const isSpotAvailable = true;

    const largeSpot = new LargeSpot(parkingSpotID, isSpotAvailable);

    expect(largeSpot.getNumber()).toBe(parkingSpotID);
    expect(largeSpot.isSpotOccupied()).toBe(isSpotAvailable);
    expect(largeSpot.getType()).toBe(ParkingSpotType.LARGE);
  });

  it("should create a LargeSpot instance with default availability as true", () => {
    const parkingSpotID = "C2";

    const largeSpot = new LargeSpot(parkingSpotID);

    expect(largeSpot.getNumber()).toBe(parkingSpotID);
    expect(largeSpot.isSpotOccupied()).toBe(false);
  });

  it("should return the correct parking spot type when not available", () => {
    const parkingSpotID = "C4";
    const isSpotAvailable = false;

    const largeSpot = new LargeSpot(parkingSpotID, isSpotAvailable);

    expect(largeSpot.getType()).toBe(ParkingSpotType.LARGE);
  });
});

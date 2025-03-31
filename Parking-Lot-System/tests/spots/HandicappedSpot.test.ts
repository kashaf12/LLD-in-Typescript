import { ParkingSpotType } from "../../src/constants/enums";
import { HandicappedSpot } from "../../src/spots/HandicappedSpot";

describe("HandicappedSpot", () => {
  it("should create a HandicappedSpot instance with the correct ID and availability", () => {
    const parkingSpotID = "C1";
    const isSpotAvailable = true;

    const handicappedSpot = new HandicappedSpot(parkingSpotID, isSpotAvailable);

    expect(handicappedSpot.getNumber()).toBe(parkingSpotID);
    expect(handicappedSpot.isSpotOccupied()).toBe(isSpotAvailable);
    expect(handicappedSpot.getType()).toBe(ParkingSpotType.HANDICAPPED);
  });

  it("should create a HandicappedSpot instance with default availability as true", () => {
    const parkingSpotID = "C2";

    const handicappedSpot = new HandicappedSpot(parkingSpotID);

    expect(handicappedSpot.getNumber()).toBe(parkingSpotID);
    expect(handicappedSpot.isSpotOccupied()).toBe(false);
  });

  it("should return the correct parking spot type when not available", () => {
    const parkingSpotID = "C4";
    const isSpotAvailable = false;

    const handicappedSpot = new HandicappedSpot(parkingSpotID, isSpotAvailable);

    expect(handicappedSpot.getType()).toBe(ParkingSpotType.HANDICAPPED);
  });
});

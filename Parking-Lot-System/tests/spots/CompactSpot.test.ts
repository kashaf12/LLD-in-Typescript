import { ParkingSpotType, VehicleType } from "../../src/constants/enums";
import { VehicleFactory } from "../../src/factory/VehicleFactory";
import { CompactSpot } from "../../src/spots/CompactSpot";

describe("CompactSpot", () => {
  it("should create a CompactSpot instance with the correct ID and availability", () => {
    const parkingSpotID = "C1";
    const isSpotAvailable = true;

    const compactSpot = new CompactSpot(parkingSpotID, isSpotAvailable);

    expect(compactSpot.getNumber()).toBe(parkingSpotID);
    expect(compactSpot.isSpotOccupied()).toBe(isSpotAvailable);
    expect(compactSpot.getType()).toBe(ParkingSpotType.COMPACT);
  });

  it("should create a CompactSpot instance with default availability as true", () => {
    const parkingSpotID = "C2";

    const compactSpot = new CompactSpot(parkingSpotID);

    expect(compactSpot.getNumber()).toBe(parkingSpotID);
    expect(compactSpot.isSpotOccupied()).toBe(false);
  });

  it("should return the correct parking spot type when not available", () => {
    const parkingSpotID = "C4";
    const isSpotAvailable = false;

    const compactSpot = new CompactSpot(parkingSpotID, isSpotAvailable);

    expect(compactSpot.getType()).toBe(ParkingSpotType.COMPACT);
  });

  it("should assign a vehicle to the spot", () => {
    const parkingSpotID = "C6";
    const isSpotOccupied = false;
    const vehicle = VehicleFactory.createVehicle("ABC", VehicleType.CAR); // Mocking the vehicle

    const compactSpot = new CompactSpot(parkingSpotID, isSpotOccupied);
    compactSpot.assignVehicle(vehicle);

    expect(compactSpot.getVehicle()).toBe(vehicle);
    expect(compactSpot.isSpotOccupied()).toBe(true);
  });
});

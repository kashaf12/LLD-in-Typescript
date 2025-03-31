import { ParkingSpotType } from "../../src/constants/enums";
import { ParkingSpotFactory } from "../../src/factory/ParkingSpotFactory";

describe("ParkingSpotFactory", () => {
  it("should create a HandicappedSpot when type is Handicapped", () => {
    const parkingSpotNumber = "C1";
    const parkingSpot = ParkingSpotFactory.createParkingSpot(
      parkingSpotNumber,
      ParkingSpotType.HANDICAPPED
    );

    expect(parkingSpot.getNumber()).toBe(parkingSpotNumber);
    expect(parkingSpot.getType()).toBe(ParkingSpotType.HANDICAPPED);
  });

  it("should create a Compact when type is Compact", () => {
    const parkingSpotNumber = "C1";
    const parkingSpot = ParkingSpotFactory.createParkingSpot(
      parkingSpotNumber,
      ParkingSpotType.COMPACT
    );

    expect(parkingSpot.getNumber()).toBe(parkingSpotNumber);
    expect(parkingSpot.getType()).toBe(ParkingSpotType.COMPACT);
  });

  it("should create a Large when type is Large", () => {
    const parkingSpotNumber = "C1";
    const parkingSpot = ParkingSpotFactory.createParkingSpot(
      parkingSpotNumber,
      ParkingSpotType.LARGE
    );

    expect(parkingSpot.getNumber()).toBe(parkingSpotNumber);
    expect(parkingSpot.getType()).toBe(ParkingSpotType.LARGE);
  });

  it("should create a Motorbike when type is Motorbike", () => {
    const parkingSpotNumber = "C1";
    const parkingSpot = ParkingSpotFactory.createParkingSpot(
      parkingSpotNumber,
      ParkingSpotType.MOTORBIKE
    );

    expect(parkingSpot.getNumber()).toBe(parkingSpotNumber);
    expect(parkingSpot.getType()).toBe(ParkingSpotType.MOTORBIKE);
  });

  it("should create a Electric when type is Electric", () => {
    const parkingSpotNumber = "C1";
    const parkingSpot = ParkingSpotFactory.createParkingSpot(
      parkingSpotNumber,
      ParkingSpotType.ELECTRIC
    );

    expect(parkingSpot.getNumber()).toBe(parkingSpotNumber);
    expect(parkingSpot.getType()).toBe(ParkingSpotType.ELECTRIC);
  });
});

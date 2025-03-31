import { VehicleType } from "../../src/constants/enums";
import { VehicleFactory } from "../../src/factory/VehicleFactory";

describe("VehicleFactory", () => {
  it("should create a Truck instance with the correct registration number and type", () => {
    const licenseNumber = "ABC123";
    const truck = VehicleFactory.createVehicle(
      licenseNumber,
      VehicleType.TRUCK
    );

    expect(truck.getLicenseNumber()).toBe(licenseNumber);
    expect(truck.getType()).toBe(VehicleType.TRUCK);
  });
  it("should create a Car instance with the correct registration number and type", () => {
    const licenseNumber = "XYZ456";
    const car = VehicleFactory.createVehicle(licenseNumber, VehicleType.CAR);

    expect(car.getLicenseNumber()).toBe(licenseNumber);
    expect(car.getType()).toBe(VehicleType.CAR);
  });
  it("should create a Van instance with the correct registration number and type", () => {
    const licenseNumber = "LMN789";
    const van = VehicleFactory.createVehicle(licenseNumber, VehicleType.VAN);

    expect(van.getLicenseNumber()).toBe(licenseNumber);
    expect(van.getType()).toBe(VehicleType.VAN);
  });
  it("should create a MotorBike instance with the correct registration number and type", () => {
    const licenseNumber = "DEF456";
    const motorBike = VehicleFactory.createVehicle(
      licenseNumber,
      VehicleType.MOTORBIKE
    );

    expect(motorBike.getLicenseNumber()).toBe(licenseNumber);
    expect(motorBike.getType()).toBe(VehicleType.MOTORBIKE);
  });
  it("should create a Electric instance with the correct registration number and type", () => {
    const licenseNumber = "BUS123";
    const bus = VehicleFactory.createVehicle(
      licenseNumber,
      VehicleType.ELECTRIC
    );

    expect(bus.getLicenseNumber()).toBe(licenseNumber);
    expect(bus.getType()).toBe(VehicleType.ELECTRIC);
  });
});

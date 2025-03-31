import { VehicleType } from "../../src/constants/enums";
import { MotorBike } from "../../src/vehicles/MotorBike";

describe("MotorBike", () => {
  it("should create a MotorBike instance with the correct registration number and type", () => {
    const licenseNumber = "ABC123";
    const motorBike = new MotorBike(licenseNumber);

    expect(motorBike.getLicenseNumber()).toBe(licenseNumber);
    expect(motorBike.getType()).toBe(VehicleType.MOTORBIKE);
  });
});

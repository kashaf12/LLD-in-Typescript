import { VehicleType } from "../../src/constants/enums";
import { Truck } from "../../src/vehicles/Truck";

describe("Truck", () => {
  it("should create a Truck instance with the correct registration number and type", () => {
    const licenseNumber = "ABC123";
    const truck = new Truck(licenseNumber);

    expect(truck.getLicenseNumber()).toBe(licenseNumber);
    expect(truck.getType()).toBe(VehicleType.TRUCK);
  });
});

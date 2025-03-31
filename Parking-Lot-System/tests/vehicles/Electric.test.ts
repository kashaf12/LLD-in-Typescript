import { VehicleType } from "../../src/constants/enums";
import { Electric } from "../../src/vehicles/Electric";

describe("Electric", () => {
  it("should create a Electric instance with the correct registration number and type", () => {
    const licenseNumber = "ABC123";
    const electric = new Electric(licenseNumber);

    expect(electric.getLicenseNumber()).toBe(licenseNumber);
    expect(electric.getType()).toBe(VehicleType.ELECTRIC);
  });
});

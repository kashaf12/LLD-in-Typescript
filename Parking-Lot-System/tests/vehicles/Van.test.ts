import { VehicleType } from "../../src/constants/enums";
import { Van } from "../../src/vehicles/Van";

describe("Van", () => {
  it("should create a Van instance with the correct registration number and type", () => {
    const licenseNumber = "ABC123";
    const van = new Van(licenseNumber);

    expect(van.getLicenseNumber()).toBe(licenseNumber);
    expect(van.getType()).toBe(VehicleType.VAN);
  });
});

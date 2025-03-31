import { VehicleType } from "../../src/constants/enums";
import { Car } from "../../src/vehicles/Car";

describe("Car", () => {
  it("should create a Car instance with the correct registration number and type", () => {
    const licenseNumber = "ABC123";
    const car = new Car(licenseNumber);

    expect(car.getLicenseNumber()).toBe(licenseNumber);
    expect(car.getType()).toBe(VehicleType.CAR);
  });
});

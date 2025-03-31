import { Address } from "../../src/models/Address";

describe("Address", () => {
  it("should return the full address as a formatted string", () => {
    const street = "123 Main St";
    const city = "Springfield";
    const state = "IL";
    const zipCode = "62704";
    const country = "USA";

    const address = new Address(street, city, state, zipCode, country);

    expect(address.getFullAddress()).toBe(
      `${street}, ${city}, ${state} ${zipCode}, ${country}`
    );
  });
});

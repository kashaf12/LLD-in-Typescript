import {
  ParkingSpotType,
  PaymentMethod,
  PaymentStatus,
  VehicleType,
} from "./constants/enums";
import { ParkingSpotFactory } from "./factory/ParkingSpotFactory";
import { VehicleFactory } from "./factory/VehicleFactory";
import { Address } from "./models/Address";
import { ParkingAttendantPortal } from "./models/ParkingAttendantPortal";
import { Payment } from "./models/Payment";
import { CustomerInfoPanel } from "./panels/CustomerInfoPanel";
import { ElectricPanel } from "./panels/ElectricPanel";
import { EntryPanel } from "./panels/EntryPanel";
import { ExitPanel } from "./panels/ExitPanel";
import { ParkingDisplayBoard } from "./parking/ParkingDisplayBoard";
import { ParkingFloor } from "./parking/ParkingFloor";
import { ParkingLot } from "./parking/ParkingLot";
import { ElectricSpot } from "./spots/ElectricSpot";
import { FirstAvailableStrategy } from "./strategies/assignment/FirstAvailableStrategy";
import { CashPaymentStrategy } from "./strategies/payment/CashPaymentStrategy";
import { CreditCardPaymentStrategy } from "./strategies/payment/CreditCardPaymentStrategy";
import { UPIPaymentStrategy } from "./strategies/payment/UPIPaymentStrategy";
import { DayNightPricingStrategy } from "./strategies/pricing/DayNightPricingStrategy";
import { FlatRatePricingStrategy } from "./strategies/pricing/FlatRatePricingStrategy";
import { HourlyPricingStrategy } from "./strategies/pricing/HourlyPricingStrategy";
import { Admin } from "./users/Admin";
import { ParkingAttendant } from "./users/ParkingAttendant";

function delay(ms: number): void {
  const start = Date.now();
  while (Date.now() - start < ms) {
    // Empty loop to simulate delay
  }
}

function divider(message: string): void {
  console.log("\n" + "=".repeat(50));
  console.log(`${message}`);
  console.log("=".repeat(50));
}

(function main() {
  divider("🅿️ INITIALIZING PARKING LOT SYSTEM");

  const parkingLotAddress = new Address(
    "123 Main Street",
    "Metropolis",
    "NY",
    "10001",
    "USA"
  );
  console.log(
    `📍 Created parking lot address: ${parkingLotAddress.getFullAddress()}`
  );

  const vehicleSurcharges = new Map<VehicleType, number>();
  vehicleSurcharges.set(VehicleType.TRUCK, 2); // Extra $2 for trucks
  vehicleSurcharges.set(VehicleType.VAN, 1); // Extra $1 for vans

  const hourlyPricing = new HourlyPricingStrategy(5, 4, 3, vehicleSurcharges);
  const flatRatePricing = new FlatRatePricingStrategy(20, vehicleSurcharges);
  const dayNightPricing = new DayNightPricingStrategy(
    5, // day rate
    3, // night rate
    vehicleSurcharges,
    0.1, // tax rate
    8, // day starts at 8 AM
    20 // night starts at 8 PM
  );

  const spotAssignmentStrategy = new FirstAvailableStrategy();

  const cashPayment = new CashPaymentStrategy();
  const creditCardPayment = new CreditCardPaymentStrategy();
  const upiPayment = new UPIPaymentStrategy();

  // Create a parking lot
  const parkingLot = new ParkingLot(
    "Downtown Parking",
    parkingLotAddress,
    [], // Floors will be added later
    [], // Entry panels will be added later
    [], // Exit panels will be added later
    hourlyPricing, // Default pricing strategy
    0, // Capacity will be calculated based on floors
    spotAssignmentStrategy // Default spot assignment strategy
  );
  console.log(`🏢 Created parking lot: ${parkingLot.getName()}`);

  // Create an admin user
  const admin = new Admin("admin", "password123");
  console.log("👨‍💼 Created admin user");

  divider("🏗️ SETTING UP PARKING INFRASTRUCTURE");

  // Create parking spots for Floor 1
  const floor1Spots = [];

  // Create 5 Compact spots
  for (let i = 1; i <= 5; i++) {
    floor1Spots.push(
      ParkingSpotFactory.createParkingSpot(`C-${i}`, ParkingSpotType.COMPACT)
    );
  }

  // Create 3 Large spots
  for (let i = 1; i <= 3; i++) {
    floor1Spots.push(
      ParkingSpotFactory.createParkingSpot(`L-${i}`, ParkingSpotType.LARGE)
    );
  }

  // Create 2 Handicapped spots
  for (let i = 1; i <= 2; i++) {
    floor1Spots.push(
      ParkingSpotFactory.createParkingSpot(
        `H-${i}`,
        ParkingSpotType.HANDICAPPED
      )
    );
  }

  // Create 3 Motorbike spots
  for (let i = 1; i <= 3; i++) {
    floor1Spots.push(
      ParkingSpotFactory.createParkingSpot(`M-${i}`, ParkingSpotType.MOTORBIKE)
    );
  }

  // Create 2 Electric spots with charging panels
  const electricSpots = [];
  for (let i = 1; i <= 2; i++) {
    const electricSpot = ParkingSpotFactory.createParkingSpot(
      `E-${i}`,
      ParkingSpotType.ELECTRIC
    ) as ElectricSpot;

    // Set up charging panel for each electric spot
    const chargingPanel = new ElectricPanel(`CP-${i}`, 10); // $10 per hour charging rate
    electricSpot.setChargingPanel(chargingPanel);

    electricSpots.push(electricSpot);
    floor1Spots.push(electricSpot);
  }

  console.log(`🅿️ Created ${floor1Spots.length} parking spots for Floor 1`);

  // Create a display board for Floor 1
  const displayBoard1 = new ParkingDisplayBoard(
    "DB-1",
    new Map([
      [ParkingSpotType.COMPACT, 5],
      [ParkingSpotType.LARGE, 3],
      [ParkingSpotType.HANDICAPPED, 2],
      [ParkingSpotType.MOTORBIKE, 3],
      [ParkingSpotType.ELECTRIC, 2],
    ])
  );

  // Create a customer info panel for Floor 1
  const customerInfoPanel1 = new CustomerInfoPanel(
    "CIP-1",
    null as any // Will be set after floor creation
  );

  // Create Floor 1
  const floor1 = new ParkingFloor(
    "Floor-1",
    floor1Spots,
    displayBoard1,
    customerInfoPanel1,
    floor1Spots.length
  );

  // Set the floor reference in the customer info panel
  customerInfoPanel1.setFloor(floor1);

  // Add Floor 1 to the parking lot
  admin.addParkingFloor(parkingLot, floor1);
  console.log(
    `🏬 Added Floor-1 to the parking lot with ${floor1Spots.length} spots`
  );

  // Create an entry panel
  const entryPanel1 = new EntryPanel("EP-1", parkingLot);
  admin.addEntrancePanel(parkingLot, entryPanel1);
  console.log("🚪 Added Entry Panel EP-1 to the parking lot");

  // Create an exit panel
  const exitPanel1 = new ExitPanel("XP-1", parkingLot);
  admin.addExitPanel(parkingLot, exitPanel1);
  console.log("🚪 Added Exit Panel XP-1 to the parking lot");

  // Create a parking attendant
  const attendant = new ParkingAttendant("attendant", "attendant123");
  const attendantPortal = new ParkingAttendantPortal("AP-1");
  console.log("👨‍💼 Created parking attendant and portal");

  // Display the initial state of available spots
  displayBoard1.showAvailableSpots();

  divider("🚗 VEHICLE ENTRY SIMULATION");

  // Create vehicles using the factory pattern
  const car1 = VehicleFactory.createVehicle("CAR-001", VehicleType.CAR);
  const car2 = VehicleFactory.createVehicle("CAR-002", VehicleType.CAR);
  const truck1 = VehicleFactory.createVehicle("TRK-001", VehicleType.TRUCK);
  const motorbike1 = VehicleFactory.createVehicle(
    "MBK-001",
    VehicleType.MOTORBIKE
  );
  const electricCar1 = VehicleFactory.createVehicle(
    "ELC-001",
    VehicleType.ELECTRIC
  );

  console.log(
    "🚗 Created vehicles: 2 cars, 1 truck, 1 motorbike, 1 electric car"
  );

  // Vehicles enter the parking lot
  console.log("\n👉 Car 1 entering:");
  const ticket1 = entryPanel1.printTicket(car1);
  console.log(`   🎫 Ticket issued: ${ticket1?.getTicketNumber()}`);
  console.log(`   🅿️ Spot assigned: ${ticket1?.getParkingSpot().getNumber()}`);

  console.log("\n👉 Car 2 entering:");
  const ticket2 = entryPanel1.printTicket(car2);
  console.log(`   🎫 Ticket issued: ${ticket2?.getTicketNumber()}`);
  console.log(`   🅿️ Spot assigned: ${ticket2?.getParkingSpot().getNumber()}`);

  console.log("\n👉 Truck entering:");
  const ticket3 = entryPanel1.printTicket(truck1);
  console.log(`   🎫 Ticket issued: ${ticket3?.getTicketNumber()}`);
  console.log(`   🅿️ Spot assigned: ${ticket3?.getParkingSpot().getNumber()}`);

  console.log("\n👉 Motorbike entering:");
  const ticket4 = entryPanel1.printTicket(motorbike1);
  console.log(`   🎫 Ticket issued: ${ticket4?.getTicketNumber()}`);
  console.log(`   🅿️ Spot assigned: ${ticket4?.getParkingSpot().getNumber()}`);

  console.log("\n👉 Electric car entering:");
  const ticket5 = entryPanel1.printTicket(electricCar1);
  console.log(`   🎫 Ticket issued: ${ticket5?.getTicketNumber()}`);
  console.log(`   🅿️ Spot assigned: ${ticket5?.getParkingSpot().getNumber()}`);

  // Display the updated state of available spots
  console.log("\nUpdated parking status:");
  displayBoard1.showAvailableSpots();

  // Electric car using charging panel
  if (
    ticket5 &&
    ticket5.getParkingSpot().getType() === ParkingSpotType.ELECTRIC
  ) {
    const electricSpot = ticket5.getParkingSpot() as ElectricSpot;
    console.log("\n⚡ Electric car starting charging session");
    electricSpot.startCharging();
    console.log("⚡ Charging in progress...");

    // Simulate charging for a period
    delay(2000);

    console.log("⚡ Electric car stopping charging session");
    electricSpot.stopCharging();
    const chargingFee = electricSpot.getChargingPanel().calculateChargingFee();
    console.log(`⚡ Charging fee: $${chargingFee.toFixed(2)}`);

    // Process charging payment
    const chargingPayment = new Payment(
      chargingFee,
      new Date(),
      PaymentStatus.UNPAID,
      PaymentMethod.CREDIT_CARD
    );
    chargingPayment.setPaymentStrategy(creditCardPayment);
    electricSpot.getChargingPanel().processPayment(chargingPayment);
    console.log("💳 Charging payment processed successfully");
  }

  divider("🚶 VEHICLE EXIT SIMULATION");

  // Fast forward time to simulate vehicles staying for some hours
  console.log(
    "⏱️ Fast forwarding time (vehicles stay parked for a few hours)..."
  );

  // Simulate Car 1 exiting
  console.log("\n👉 Car 1 exiting:");
  // Calculate parking fee
  if (ticket1) {
    // Set a past issuance time to simulate time spent in the parking lot
    Object.defineProperty(ticket1, "issuedAt", {
      value: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    });

    const fee = exitPanel1.scanTicket(ticket1);
    console.log(`   💰 Parking fee: $${fee.toFixed(2)}`);

    // Create a payment
    const payment1 = new Payment(
      fee,
      new Date(),
      PaymentStatus.UNPAID,
      PaymentMethod.CASH
    );
    payment1.setPaymentStrategy(cashPayment);

    // Process the payment
    const paymentSuccess = exitPanel1.processPayment(ticket1, payment1);
    console.log(`   💵 Payment successful: ${paymentSuccess}`);
    console.log(
      `   🚗 Car 1 exited from spot: ${ticket1.getParkingSpot().getNumber()}`
    );
  }

  // Simulate Car 2 exiting with credit card
  console.log("\n👉 Car 2 exiting:");
  if (ticket2) {
    // Set a past issuance time
    Object.defineProperty(ticket2, "issuedAt", {
      value: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    });

    const fee = exitPanel1.scanTicket(ticket2);
    console.log(`   💰 Parking fee: $${fee.toFixed(2)}`);

    // Create a payment
    const payment2 = new Payment(
      fee,
      new Date(),
      PaymentStatus.UNPAID,
      PaymentMethod.CREDIT_CARD
    );
    payment2.setPaymentStrategy(creditCardPayment);

    // Process the payment
    const paymentSuccess = exitPanel1.processPayment(ticket2, payment2);
    console.log(`   💳 Payment successful: ${paymentSuccess}`);
    console.log(
      `   🚗 Car 2 exited from spot: ${ticket2.getParkingSpot().getNumber()}`
    );
  }

  // Display the updated state of available spots
  console.log("\nUpdated parking status after exits:");
  displayBoard1.showAvailableSpots();

  divider("💰 CHANGING PRICING STRATEGY");

  // Change pricing strategy to flat rate for nighttime
  console.log(
    "🌙 Night time approaching, changing to flat rate pricing strategy"
  );
  parkingLot.getPricingStrategy = () => flatRatePricing;

  // Simulate Truck exiting with flat rate pricing
  console.log("\n👉 Truck exiting:");
  if (ticket3) {
    // Set a past issuance time
    Object.defineProperty(ticket3, "issuedAt", {
      value: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    });

    const fee = exitPanel1.scanTicket(ticket3);
    console.log(`   💰 Parking fee (flat rate): $${fee.toFixed(2)}`);

    // Create a payment
    const payment3 = new Payment(
      fee,
      new Date(),
      PaymentStatus.UNPAID,
      PaymentMethod.UPI
    );
    payment3.setPaymentStrategy(upiPayment);

    // Process the payment
    const paymentSuccess = exitPanel1.processPayment(ticket3, payment3);
    console.log(`   📱 Payment successful: ${paymentSuccess}`);
    console.log(
      `   🚚 Truck exited from spot: ${ticket3.getParkingSpot().getNumber()}`
    );
  }

  // Change pricing strategy to day/night for the next day
  console.log("\n🌞 Next day, changing to day/night pricing strategy");
  parkingLot.getPricingStrategy = () => dayNightPricing;

  // Simulate Motorbike exiting with day/night pricing
  console.log("\n👉 Motorbike exiting:");
  if (ticket4) {
    // Set a past issuance time
    Object.defineProperty(ticket4, "issuedAt", {
      value: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
    });

    const fee = exitPanel1.scanTicket(ticket4);
    console.log(`   💰 Parking fee (day/night): $${fee.toFixed(2)}`);

    // Create a payment
    const payment4 = new Payment(
      fee,
      new Date(),
      PaymentStatus.UNPAID,
      PaymentMethod.CASH
    );
    payment4.setPaymentStrategy(cashPayment);

    // Process the payment
    const paymentSuccess = exitPanel1.processPayment(ticket4, payment4);
    console.log(`   💵 Payment successful: ${paymentSuccess}`);
    console.log(
      `   🏍️ Motorbike exited from spot: ${ticket4
        .getParkingSpot()
        .getNumber()}`
    );
  }

  // Simulate Electric car exiting with attendant help
  console.log("\n👉 Electric car exiting with attendant help:");
  if (ticket5) {
    // Set a past issuance time
    Object.defineProperty(ticket5, "issuedAt", {
      value: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    });

    console.log("   🧑‍🔧 Customer approaching attendant for help");
    const processedTicket = attendantPortal.processTicket(ticket5);
    const fee = parkingLot.getPricingStrategy().getTotalFee(processedTicket);
    console.log(`   💰 Parking fee processed by attendant: ${fee.toFixed(2)}`);

    // Create a payment
    const payment5 = new Payment(
      fee,
      new Date(),
      PaymentStatus.UNPAID,
      PaymentMethod.CREDIT_CARD
    );
    payment5.setPaymentStrategy(creditCardPayment);

    // Process the payment through attendant
    const paymentSuccess = attendantPortal.processPayment(
      processedTicket,
      payment5
    );
    console.log(`   💳 Payment processed by attendant: ${paymentSuccess}`);
    console.log(
      `   🔋 Electric car exited from spot: ${ticket5
        .getParkingSpot()
        .getNumber()}`
    );
  }

  // Display the final state of available spots
  console.log("\nFinal parking status:");
  displayBoard1.showAvailableSpots();

  divider("📊 SYSTEM STATISTICS");

  console.log(
    `📈 Total capacity: ${
      parkingLot.getFloors().length
    } floors, ${floor1.getCapacity()} spots`
  );
  console.log(`📊 Available spots: ${floor1.getAvailableSpots()}`);
  console.log(
    `💰 Pricing strategy in use: ${
      parkingLot.getPricingStrategy().constructor.name
    }`
  );

  divider("🏁 SIMULATION COMPLETE");
})();

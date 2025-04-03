import { City } from "./models/location/city";
import { Theatre } from "./models/location/theatre";
import { Screen } from "./models/location/screen";
import { Seat } from "./models/location/seat";
import { Movie } from "./models/show/movie";
import { Show } from "./models/show/show";
import { Guest } from "./models/user/guest";
import { CreditCardPayment } from "./models/payment/credit-card";
import { UPIPayment } from "./models/payment/upi";
import { EmailNotification } from "./models/notification/email-notification";
import { SMSNotification } from "./models/notification/sms-notification";
import { NotificationPreference } from "./models/notification/notification-preference";
import { SeatType, NotificationType } from "./types/enums";
import { BookingService } from "./services/booking-service";
import { SearchService } from "./services/search-service";
import { NotificationService } from "./services/notification-service";

function main() {
  console.log("Starting Movie Ticket Booking System demo...");

  const bookingService = BookingService.getInstance();
  const searchService = SearchService.getInstance();
  const notificationService = NotificationService.getInstance();

  const emailChannel = new EmailNotification(
    "smtp.moviebooking.com",
    "notifications@moviebooking.com"
  );
  const smsChannel = new SMSNotification("twilio", "MOVIEBOOK");
  notificationService.addDefaultChannel(emailChannel);

  const newYork = new City("C1", "New York", "NY", "10001");
  const losAngeles = new City("C2", "Los Angeles", "CA", "90001");
  searchService.addCity(newYork);
  searchService.addCity(losAngeles);

  const nyTheatre1 = new Theatre(
    "T1",
    "AMC Empire 25",
    "234 W 42nd St",
    newYork
  );
  const nyTheatre2 = new Theatre(
    "T2",
    "Regal E-Walk",
    "247 W 42nd St",
    newYork
  );
  const laTheatre = new Theatre(
    "T3",
    "TCL Chinese Theatre",
    "6925 Hollywood Blvd",
    losAngeles
  );

  const screen1 = new Screen("S1", "Screen 1", nyTheatre1, 100);
  const screen2 = new Screen("S2", "Screen 2", nyTheatre1, 80);
  const screen3 = new Screen("S3", "IMAX", nyTheatre2, 120);
  const screen4 = new Screen("S4", "Screen 1", laTheatre, 150);

  for (let row = 0; row < 10; row++) {
    const rowLabel = String.fromCharCode(65 + row); // A, B, C, ...
    for (let seatNum = 1; seatNum <= 10; seatNum++) {
      const seatId = `SEAT_${screen1.getScreenId()}_${rowLabel}${seatNum}`;
      const seatNumber = `${rowLabel}${seatNum}`;
      let seatType = SeatType.REGULAR;
      let price = 10.0;

      if (row >= 8) {
        seatType = SeatType.PREMIUM;
        price = 15.0;
      }

      new Seat(seatId, seatNumber, seatType, screen1, price);
    }
  }

  const movie1 = new Movie(
    "M1",
    "The Matrix Resurrections",
    "Return to the world of The Matrix",
    148,
    "English",
    new Date("2021-12-22"),
    "Science Fiction"
  );

  const movie2 = new Movie(
    "M2",
    "Spider-Man: No Way Home",
    "Peter Parker's identity is revealed",
    148,
    "English",
    new Date("2021-12-17"),
    "Action"
  );

  searchService.addMovie(movie1);
  searchService.addMovie(movie2);

  const show1Date = new Date();
  show1Date.setHours(show1Date.getHours() + 1); // Show 1 hour from now

  const show2Date = new Date();
  show2Date.setHours(show2Date.getHours() + 3); // Show 3 hours from now

  const show3Date = new Date();
  show3Date.setHours(show3Date.getHours() + 5); // Show 5 hours from now

  const show1 = new Show("SH1", show1Date, movie1, screen1, 12.5);
  const show2 = new Show("SH2", show2Date, movie2, screen2, 12.5);
  const show3 = new Show("SH3", show3Date, movie1, screen3, 15.0);

  const guest = new Guest("SESSION_123");

  const customer = guest.registerAccount(
    "C1",
    "John Doe",
    "john.doe@example.com",
    "password123",
    new Date("1990-01-01"),
    "123 Main St, New York, NY"
  );

  const bookingConfirmPref = new NotificationPreference(
    customer,
    NotificationType.BOOKING_CONFIRMATION
  );
  bookingConfirmPref.updatePreference(emailChannel, true);
  bookingConfirmPref.updatePreference(smsChannel, true);

  const paymentConfirmPref = new NotificationPreference(
    customer,
    NotificationType.PAYMENT_CONFIRMATION
  );
  paymentConfirmPref.updatePreference(emailChannel, true);

  console.log("\n--- Customer searching for movies ---");

  const sciFiMovies = searchService.searchMovies({ genre: "Science Fiction" });
  console.log(`Found ${sciFiMovies.length} sci-fi movies:`);
  sciFiMovies.forEach((movie) => {
    console.log(`- ${movie.getTitle()} (${movie.getLanguage()})`);
  });

  console.log("\n--- Customer searching for shows in New York ---");
  const selectedMovie = movie1;
  const nyShows = searchService.getShowsForMovieInCity(
    selectedMovie,
    "New York"
  );
  console.log(
    `Found ${
      nyShows.length
    } shows for "${selectedMovie.getTitle()}" in New York:`
  );
  nyShows.forEach((show) => {
    const theatre = show.getScreen().getTheatre();
    console.log(
      `- ${theatre.getName()}, ${show.getScreen().getName()}, ${show
        .getStartTime()
        .toLocaleTimeString()}`
    );
  });

  console.log("\n--- Customer selecting seats ---");
  const selectedShow = show1;
  const availableSeats = selectedShow.getAvailableSeats();
  console.log(
    `Available seats for ${selectedShow
      .getStartTime()
      .toLocaleTimeString()} show: ${availableSeats.length}`
  );

  const selectedSeatIds = [
    availableSeats[0].getId(), // A1
    availableSeats[1].getId(), // A2
  ];

  console.log(
    `Customer selected seats: ${selectedSeatIds
      .map((id) => id.split("_").pop())
      .join(", ")}`
  );

  console.log("\n--- Creating booking ---");
  const booking = bookingService.createBooking(
    customer,
    selectedShow,
    selectedSeatIds
  );

  if (booking) {
    console.log(`Booking created with ID: ${booking.getBookingId()}`);
    console.log(`Total amount: $${booking.getAmount().toFixed(2)}`);

    // Apply coupon
    console.log("\n--- Applying coupon ---");
    if (bookingService.applyCoupon(booking, "FIRST10")) {
      console.log(
        `Coupon applied. New total: $${booking.getAmount().toFixed(2)}`
      );
    }

    // Process payment
    console.log("\n--- Processing payment ---");
    const creditCardPayment = new CreditCardPayment(
      "4111111111111111",
      "John Doe",
      "12/25",
      "123"
    );

    if (bookingService.processPayment(booking, creditCardPayment)) {
      console.log("Payment successful!");
      console.log(`Booking status: ${booking.getStatus()}`);

      // Show booking details
      console.log("\n--- Booking Details ---");
      console.log(`Movie: ${booking.getShow().getMovie().getTitle()}`);
      console.log(
        `Theatre: ${booking.getShow().getScreen().getTheatre().getName()}`
      );
      console.log(`Screen: ${booking.getShow().getScreen().getName()}`);
      console.log(
        `Date/Time: ${booking.getShow().getStartTime().toLocaleString()}`
      );
      console.log(
        `Seats: ${booking
          .getSeats()
          .map((seat) => seat.getSeat().getSeatNumber())
          .join(", ")}`
      );
      console.log(`Amount Paid: $${booking.getAmount().toFixed(2)}`);
    } else {
      console.log("Payment failed!");
    }
  } else {
    console.log("Booking failed!");
  }

  // Demonstrate booking with UPI
  console.log("\n--- Creating another booking with UPI payment ---");
  // Select different seats
  const secondBookingSeatIds = [
    availableSeats[2].getId(), // A3
    availableSeats[3].getId(), // A4
  ];

  const secondBooking = bookingService.createBooking(
    customer,
    selectedShow,
    secondBookingSeatIds
  );

  if (secondBooking) {
    console.log(
      `Second booking created with ID: ${secondBooking.getBookingId()}`
    );

    // Process UPI payment
    const upiPayment = new UPIPayment("john.doe@upi");

    if (bookingService.processPayment(secondBooking, upiPayment)) {
      console.log("UPI Payment successful!");
    } else {
      console.log("UPI Payment failed!");
    }
  }

  // Show all customer bookings
  console.log("\n--- Customer's Bookings ---");
  const customerBookings = bookingService.getBookingsForCustomer(customer);
  console.log(`${customer.getName()} has ${customerBookings.length} bookings`);

  // Demonstrate booking cancellation
  console.log("\n--- Cancelling a booking ---");
  if (secondBooking && bookingService.cancelBooking(secondBooking)) {
    console.log(
      `Booking ${secondBooking.getBookingId()} cancelled successfully`
    );
  } else {
    console.log("Booking cancellation failed!");
  }
}

main();

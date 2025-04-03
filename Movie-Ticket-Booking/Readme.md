# Movie-Ticket-Booking

A comprehensive object-oriented movie ticket booking management system built with TypeScript that simulates a movie ticket booking within various cities, theatres, screens and payment strategies.

## 🎮 Features

## 📋 Requirements

### Functional Requirements

### Non-Functional Requirements

## 🏗️ Architecture

### Class Structure

## 🧠 Design Patterns Used

## 🧩 Key Learnings

## 💻 Technical Skills Gained

- TypeScript advanced features (classes, interfaces, enums, generics)
- Object-oriented programming principles
- Test-driven development with Jest
- Design patterns implementation
- Domain modeling
- Building extensible software systems

## Diagram

```mermaid
classDiagram
    %% Abstract Classes
    class Account {
        <<abstract>>
        +string id
        +string name
        +string email
        +string password
        +AccountStatus status
        +login(email, password): boolean
        +resetPassword(): boolean
    }

    %% Enumerations
    class AccountStatus {
        <<enumeration>>
        ACTIVE
        BLOCKED
        BANNED
        COMPROMISED
        ARCHIVED
        UNKNOWN
    }

    class BookingStatus {
        <<enumeration>>
        REQUESTED
        PENDING
        CONFIRMED
        CANCELLED
        COMPLETED
    }

    class PaymentStatus {
        <<enumeration>>
        PENDING
        COMPLETED
        FAILED
        DECLINED
        CANCELLED
        REFUNDED
    }

    class SeatType {
        <<enumeration>>
        REGULAR
        PREMIUM
        ACCESSIBLE
        EMERGENCY_EXIT
        VIP
    }

    %% Concrete Classes
    class Customer {
        +Date dateOfBirth
        +string address
        +makeBooking(): Booking
        +getBookings(): List~Booking~
    }

    class Admin {
        +addMovie(Movie): boolean
        +addShow(Show): boolean
        +blockUser(Customer): boolean
    }

    class FrontDeskOfficer {
        +createBooking(Customer): Booking
    }

    class Guest {
        +registerAccount(): Customer
    }

    class City {
        +string name
        +string state
        +string zipCode
        +getTheatres(): List~Theatre~
    }

    class Theatre {
        +string name
        +string address
        +City city
        +List~Screen~ screens
        +getShows(): List~Show~
        +addScreen(Screen): boolean
    }

    class Screen {
        +string name
        +Theatre theatre
        +int totalSeats
        +List~Seat~ seats
        +getShows(): List~Show~
    }

    class Seat {
        +string seatNumber
        +SeatType type
        +double price
        +Screen screen
    }

    class Movie {
        +string title
        +string description
        +int durationMins
        +string language
        +Date releaseDate
        +string genre
        +getShows(): List~Show~
    }

    class Show {
        +int showId
        +Date startTime
        +Date endTime
        +Movie movie
        +Screen screen
        +List~ShowSeat~ showSeats
        +getAvailableSeats(): List~ShowSeat~
    }

    class ShowSeat {
        +string id
        +Show show
        +Seat seat
        +boolean isReserved
        +timestamp reservedAt
        +timestamp reservationExpiry
        +boolean isBooked
        +double price
        +reserve(): boolean
        +unreserve(): boolean
        +book(): boolean
    }

    class Booking {
        +string bookingId
        +Date createdOn
        +Customer customer
        +Show show
        +BookingStatus status
        +List~ShowSeat~ seats
        +double amount
        +makePayment(Payment): boolean
        +cancel(): boolean
        +getStatus(): BookingStatus
    }

        class PaymentMethod {
        <<interface>>
        +processPayment(double amount): boolean
        +refundPayment(double amount): boolean
    }

    class CreditCardPayment {
        +string cardNumber
        +string nameOnCard
        +string expiryDate
        +string cvv
        +processPayment(double amount): boolean
        +refundPayment(double amount): boolean
    }

    class CashPayment {
        +double amountTendered
        +double changeGiven
        +processPayment(double amount): boolean
        +refundPayment(double amount): boolean
    }

    class UPIPayment {
        +string upiId
        +string transactionRef
        +processPayment(double amount): boolean
        +refundPayment(double amount): boolean
    }

    class Payment {
        +string paymentId
        +double amount
        +Date createdOn
        +PaymentStatus status
        +Booking booking
        +PaymentMethod method
        +processPayment(): boolean
        +refundPayment(): boolean
    }

        class NotificationType {
        <<enumeration>>
        BOOKING_CONFIRMATION
        BOOKING_CANCELLATION
        PAYMENT_CONFIRMATION
        PAYMENT_REFUND
        NEW_MOVIE
        DISCOUNT_OFFER
    }

    class NotificationChannel {
        <<interface>>
        +send(string content, string recipient): boolean
    }

    class EmailNotification {
        +string emailServer
        +string sender
        +send(string content, string recipient): boolean
    }

    class SMSNotification {
        +string smsGateway
        +string sender
        +send(string content, string recipient): boolean
    }

    class PushNotification {
        +string pushService
        +send(string content, string recipient): boolean
    }

    class NotificationPreference {
        +Customer customer
        +NotificationType type
        +List~NotificationChannel~ enabledChannels
        +boolean isEnabled
        +updatePreference(NotificationChannel, boolean): void
    }

    class Notification {
        +string notificationId
        +Date createdOn
        +NotificationType type
        +string content
        +Account recipient
        +send(): boolean
    }

    class Coupon {
        +string code
        +double discount
        +Date validUntil
        +boolean isValid(): boolean
        +applyDiscount(double amount): double
    }

    %% Relationships
    Account <|-- Customer
    Account <|-- Admin
    Account <|-- FrontDeskOfficer
    Guest --> Customer : registers as

    City "1" *-- "many" Theatre
    Theatre "1" *-- "many" Screen
    Screen "1" *-- "many" Seat

    Movie "1" --o "many" Show
    Screen "1" --o "many" Show
    Show "1" *-- "many" ShowSeat
    Seat "1" --o "1" ShowSeat

    Customer "1" -- "many" Booking
    Show "1" -- "many" Booking
    Booking "1" -- "many" ShowSeat
    Booking "1" -- "1" Payment
    Booking "1" -- "0..1" Coupon

    Account "1" -- "many" Notification

    %% Notification relationships
    NotificationChannel <|-- EmailNotification
    NotificationChannel <|-- SMSNotification
    NotificationChannel <|-- PushNotification
    Customer "1" -- "many" NotificationPreference
    NotificationPreference "1" -- "many" NotificationChannel

    %% Payment relationships
    PaymentMethod <|-- CreditCardPayment
    PaymentMethod <|-- CashPayment
    PaymentMethod <|-- UPIPayment
    Payment "1" -- "1" PaymentMethod
```

## 🛠️ Technology Stack

- TypeScript
- Node.js
- Jest (for testing)

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm or yarn

## ⚙️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kashaf12/LLD-in-Typescript.git
   cd Movie-Ticket-Booking
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Build the project:
   ```bash
   npm run build
   ```

## 🚀 Running the Project

Run the project with the following command:

```bash
npm run start
```

This will start a simulation of the parking lot system with vehicles entering and exiting, payments being processed, and other operations.

## 🧪 Running Tests

Run the test suite with:

```bash
npm test
```

## 🛣️ Future Enhancements

## 📜 License

MIT

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

# Low-Level Design (LLD) Learning Roadmap

This document outlines a my progress in learning LLD with typescript.

## Projects Overview

| Project              | Difficulty   | Focus Area                 |
| -------------------- | ------------ | -------------------------- |
| ✅ Tic-Tac-Toe       | Beginner     | Core OOP, Basic Patterns   |
| Snake & Ladder       | Beginner     | State Management           |
| Parking Lot          | Intermediate | Resource Allocation        |
| Movie Ticket Booking | Intermediate | Concurrency, Transactions  |
| Library Management   | Intermediate | Inventory Systems          |
| Elevator System      | Advanced     | Scheduling Algorithms      |
| Chess Game           | Advanced     | Complex Rules, AI          |
| E-commerce Platform  | Expert       | Microservices, Scalability |

## Detailed Project Checklists

### ✅ Project 1: Tic-Tac-Toe (Completed)

- [x] Implement basic game board and player mechanics
- [x] Apply Strategy pattern for winning condition checks
- [x] Use Factory Method for cell creation
- [x] Follow SOLID principles throughout implementation

### Project 2: Snake & Ladder Game

- [ ] **Core Game Mechanics**

  - [ ] Board representation with snakes and ladders
  - [ ] Dice rolling mechanism
  - [ ] Player movement logic
  - [ ] Win condition detection

- [ ] **Design Patterns to Implement**

  - [ ] **State Pattern**: For managing player and game states
  - [ ] **Command Pattern**: For move execution and potential undo functionality
  - [ ] **Observer Pattern**: For notifying UI of game state changes
  - [ ] **Singleton**: For game instance management

- [ ] **Technical Skills**
  - [ ] Random number generation
  - [ ] Event-driven programming
  - [ ] Turn-based logic

### Project 3: Parking Lot System

- [ ] **Core Functionality**

  - [ ] Multiple parking spot types (compact, large, handicapped, etc.)
  - [ ] Vehicle type hierarchy
  - [ ] Ticket generation and payment processing
  - [ ] Vacancy tracking and allocation

- [ ] **Design Patterns to Implement**

  - [ ] **Strategy Pattern**: For different pricing strategies
  - [ ] **Factory Method**: For creating various vehicle and spot types
  - [ ] **Singleton**: For parking lot instance
  - [ ] **Command Pattern**: For parking/unparking operations
  - [ ] **Observer**: For monitoring space availability

- [ ] **Technical Skills**
  - [ ] Resource allocation algorithms
  - [ ] Time-based calculations
  - [ ] Optimization techniques

### Project 4: Movie Ticket Booking System

- [ ] **Core Functionality**

  - [ ] Movie, show time, and theater management
  - [ ] Seat selection and reservation
  - [ ] Payment processing
  - [ ] Booking confirmation

- [ ] **Design Patterns to Implement**

  - [ ] **Facade Pattern**: For simplifying the booking interface
  - [ ] **Proxy Pattern**: For access control to booking operations
  - [ ] **Memento Pattern**: For saving booking state during process
  - [ ] **Builder Pattern**: For complex booking construction
  - [ ] **Chain of Responsibility**: For payment processing

- [ ] **Technical Skills**
  - [ ] Concurrency control
  - [ ] Transaction management
  - [ ] Timeout handling
  - [ ] Locking mechanisms

### Project 5: Library Management System

- [ ] **Core Functionality**

  - [ ] Book and member management
  - [ ] Check-out and return processing
  - [ ] Reservation system
  - [ ] Fine calculation
  - [ ] Search functionality

- [ ] **Design Patterns to Implement**

  - [ ] **Decorator Pattern**: For adding behaviors to books (e.g., reference only)
  - [ ] **Composite Pattern**: For handling books and book collections
  - [ ] **Iterator Pattern**: For traversing catalog
  - [ ] **Template Method**: For standardizing book processing
  - [ ] **Visitor Pattern**: For operations on different library items

- [ ] **Technical Skills**
  - [ ] Search algorithms
  - [ ] Date-based calculations
  - [ ] Inventory tracking
  - [ ] Notification systems

### Project 6: Elevator System

- [ ] **Core Functionality**

  - [ ] Multiple elevator coordination
  - [ ] Floor request handling
  - [ ] Efficient dispatching algorithm
  - [ ] Emergency protocols
  - [ ] Weight limits and overload handling

- [ ] **Design Patterns to Implement**

  - [ ] **State Pattern**: For elevator operational states
  - [ ] **Command Pattern**: For floor requests
  - [ ] **Mediator Pattern**: For coordinating multiple elevators
  - [ ] **Observer Pattern**: For floor displays and notifications
  - [ ] **Strategy Pattern**: For different scheduling algorithms

- [ ] **Technical Skills**
  - [ ] Real-time systems design
  - [ ] Optimization algorithms
  - [ ] Priority queuing
  - [ ] Fault tolerance

### Project 7: Chess Game

- [ ] **Core Functionality**

  - [ ] Board representation
  - [ ] Piece movement rules
  - [ ] Check/checkmate detection
  - [ ] Special moves (castling, en passant, promotion)
  - [ ] Game history and notation

- [ ] **Design Patterns to Implement**

  - [ ] **Flyweight Pattern**: For efficient piece representation
  - [ ] **Memento Pattern**: For game state history
  - [ ] **Strategy Pattern**: For AI opponents
  - [ ] **Command Pattern**: For moves with undo capability
  - [ ] **Interpreter Pattern**: For parsing chess notation
  - [ ] **Visitor Pattern**: For piece movement validation

- [ ] **Technical Skills**
  - [ ] Complex rule implementation
  - [ ] Game tree algorithms
  - [ ] Minimax algorithm (for AI)
  - [ ] Algebraic notation parsing

### Project 8: E-commerce Platform

- [ ] **Core Functionality**

  - [ ] Product catalog with categories
  - [ ] Shopping cart and checkout
  - [ ] User accounts and authentication
  - [ ] Order processing and tracking
  - [ ] Payment gateway integration
  - [ ] Inventory management

- [ ] **Design Patterns to Implement**

  - [ ] **Microservices Pattern**: For modular system architecture
  - [ ] **Repository Pattern**: For data access
  - [ ] **CQRS Pattern**: For separating read and write operations
  - [ ] **Saga Pattern**: For distributed transactions
  - [ ] **Event Sourcing**: For order tracking
  - [ ] **Circuit Breaker**: For handling service failures
  - [ ] **Adapter Pattern**: For payment gateway integration

- [ ] **Technical Skills**
  - [ ] Distributed systems design
  - [ ] High concurrency handling
  - [ ] System integration
  - [ ] Scalability considerations
  - [ ] Security implementation

## Design Patterns Summary

### Creational Patterns

- [ ] **Singleton**: Game engines, configuration managers
- [ ] **Factory Method**: Creating game pieces, UI elements
- [ ] **Abstract Factory**: Themed UI components, game element families
- [ ] **Builder**: Complex object construction (orders, bookings)
- [ ] **Prototype**: Cloning game states, templates

### Structural Patterns

- [ ] **Adapter**: Integrating payment gateways, external APIs
- [ ] **Bridge**: Separating abstraction from implementation
- [ ] **Composite**: File systems, organizational hierarchies
- [ ] **Decorator**: Adding behaviors to base components
- [ ] **Facade**: Simplifying complex subsystems
- [ ] **Flyweight**: Efficient handling of large numbers of similar objects
- [ ] **Proxy**: Access control, lazy loading

### Behavioral Patterns

- [ ] **Chain of Responsibility**: Request processing pipelines
- [ ] **Command**: Action encapsulation with undo capability
- [ ] **Interpreter**: Domain-specific languages, parsers
- [ ] **Iterator**: Collection traversal
- [ ] **Mediator**: Component coordination
- [ ] **Memento**: State capture and restoration
- [ ] **Observer**: Event handling, notifications
- [ ] **State**: Object behavior based on internal state
- [ ] **Strategy**: Interchangeable algorithms
- [ ] **Template Method**: Defining skeleton algorithms
- [ ] **Visitor**: Operations on object structures

### Architectural Patterns

- [ ] **MVC/MVVM**: UI applications
- [ ] **Microservices**: Distributed systems
- [ ] **Repository**: Data access abstraction
- [ ] **CQRS**: Separating read and write operations
- [ ] **Event Sourcing**: Audit logging, history tracking

## Learning Resources

### Books

- "Design Patterns: Elements of Reusable Object-Oriented Software" by GoF
- "Head First Design Patterns" by Freeman & Robson
- "Clean Code" by Robert C. Martin
- "Refactoring" by Martin Fowler

### Online Resources

- Refactoring Guru: https://refactoring.guru/design-patterns
- Source Making: https://sourcemaking.com/design_patterns
- Baeldung Design Patterns: https://www.baeldung.com/design-patterns
- Pattern Craft: https://patterncraft.com/

## Final Projects Showcase

As you complete each project, add links to your repositories here to showcase your work and track your progress:

- [x] Tic-Tac-Toe
- [ ] Snake & Ladder
- [ ] Parking Lot
- [ ] Movie Ticket Booking
- [ ] Library Management
- [ ] Elevator System
- [ ] Chess Game
- [ ] E-commerce Platform

export type GameEvent =
  | "diceRolled"
  | "moveCompleted"
  | "snake"
  | "ladder"
  | "turnSkipped"
  | "gameWon"
  | "moveUndone"
  | "turnStarted"
  | "turnEnded"
  | "turnRestored"
  | "gameStarted";

export type EventListener = (data: any) => void;

export class EventEmitter {
  private listeners: Map<GameEvent, EventListener[]> = new Map();

  addEventListener(event: GameEvent, listener: EventListener): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(listener);
  }

  removeEventListener(event: GameEvent, listener: EventListener): void {
    if (!this.listeners.has(event)) return;

    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index !== -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  fireEvent(event: GameEvent, data: any): void {
    if (!this.listeners.has(event)) return;

    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(data));
    }
  }
}

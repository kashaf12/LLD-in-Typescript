export interface NotificationChannel {
  send(content: string, recipient: string): boolean;
}

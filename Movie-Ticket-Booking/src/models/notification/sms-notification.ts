import { NotificationChannel } from "./notification-channel";

export class SMSNotification implements NotificationChannel {
  private smsGateway: string;
  private sender: string;

  constructor(smsGateway: string, sender: string) {
    this.smsGateway = smsGateway;
    this.sender = sender;
  }

  public getSmsGateway(): string {
    return this.smsGateway;
  }

  public getSender(): string {
    return this.sender;
  }

  public send(content: string, recipient: string): boolean {
    try {
      console.log(
        `Sending SMS from ${this.sender} to ${recipient} via ${this.smsGateway}`
      );
      console.log(`SMS content: ${content}`);

      return true;
    } catch (error) {
      console.error(`SMS sending error: ${error}`);
      return false;
    }
  }
}

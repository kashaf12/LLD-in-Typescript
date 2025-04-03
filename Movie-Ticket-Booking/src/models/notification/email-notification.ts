import { NotificationChannel } from "./notification-channel";

export class EmailNotification implements NotificationChannel {
  private emailServer: string;
  private sender: string;

  constructor(emailServer: string, sender: string) {
    this.emailServer = emailServer;
    this.sender = sender;
  }

  public getEmailServer(): string {
    return this.emailServer;
  }

  public getSender(): string {
    return this.sender;
  }

  public send(content: string, recipient: string): boolean {
    try {
      console.log(
        `Sending email from ${this.sender} to ${recipient} via ${this.emailServer}`
      );
      console.log(`Email content: ${content}`);

      return true;
    } catch (error) {
      console.error(`Email sending error: ${error}`);
      return false;
    }
  }
}

import { Account } from "../user/account";
import { NotificationType } from "../../types/enums";

export class Notification {
  private notificationId: string;
  private createdOn: Date;
  private type: NotificationType;
  private content: string;
  private recipient: Account;
  private isRead: boolean = false;

  constructor(
    notificationId: string,
    type: NotificationType,
    content: string,
    recipient: Account
  ) {
    this.notificationId = notificationId;
    this.createdOn = new Date();
    this.type = type;
    this.content = content;
    this.recipient = recipient;
  }

  public getNotificationId(): string {
    return this.notificationId;
  }

  public getCreatedOn(): Date {
    return this.createdOn;
  }

  public getType(): NotificationType {
    return this.type;
  }

  public getContent(): string {
    return this.content;
  }

  public getRecipient(): Account {
    return this.recipient;
  }

  public isReadStatus(): boolean {
    return this.isRead;
  }

  public markAsRead(): void {
    this.isRead = true;
  }
}

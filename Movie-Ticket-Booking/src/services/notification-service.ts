import { Account } from "../models/user/account";
import { Customer } from "../models/user/customer";
import { NotificationType } from "../types/enums";
import { Notification } from "../models/notification/notification";
import { NotificationChannel } from "../models/notification/notification-channel";

export class NotificationService {
  private static instance: NotificationService;
  private notifications: Notification[] = [];
  private defaultChannels: NotificationChannel[] = [];
  private idCounter: number = 1;

  private constructor() {
    // Private constructor for singleton pattern
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public addDefaultChannel(channel: NotificationChannel): void {
    this.defaultChannels.push(channel);
  }

  public removeDefaultChannel(channel: NotificationChannel): void {
    const index = this.defaultChannels.indexOf(channel);
    if (index !== -1) {
      this.defaultChannels.splice(index, 1);
    }
  }

  public notify(
    account: Account,
    type: NotificationType,
    content: string
  ): boolean {
    try {
      const notification = new Notification(
        `NOTIF_${this.idCounter++}`,
        type,
        content,
        account
      );

      this.notifications.push(notification);

      if (account instanceof Customer) {
        return this.notifyCustomer(account, type, content);
      } else {
        return this.notifyViaDefaultChannels(account, content);
      }
    } catch (error) {
      console.error(`Notification error: ${error}`);
      return false;
    }
  }

  public getNotifications(account: Account): Notification[] {
    return this.notifications.filter(
      (notification) => notification.getRecipient() === account
    );
  }

  private notifyCustomer(
    customer: Customer,
    type: NotificationType,
    content: string
  ): boolean {
    const preferences = customer
      .getNotificationPreferences()
      .filter(
        (pref) => pref.getNotificationType() === type && pref.getEnabled()
      );

    if (preferences.length === 0) {
      return this.notifyViaDefaultChannels(customer, content);
    }

    let success = false;
    for (const preference of preferences) {
      const channels = preference.getEnabledChannels();

      for (const channel of channels) {
        if (channel.send(content, customer.getEmail())) {
          success = true;
        }
      }
    }

    return success;
  }

  private notifyViaDefaultChannels(account: Account, content: string): boolean {
    if (this.defaultChannels.length === 0) {
      console.log("No default notification channels configured");
      return false;
    }

    let success = false;
    for (const channel of this.defaultChannels) {
      if (channel.send(content, account.getEmail())) {
        success = true;
      }
    }

    return success;
  }
}

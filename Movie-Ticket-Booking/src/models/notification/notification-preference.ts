import { Customer } from "../user/customer";
import { NotificationType } from "../../types/enums";
import { NotificationChannel } from "./notification-channel";

export class NotificationPreference {
  private customer: Customer;
  private notificationType: NotificationType;
  private enabledChannels: Map<string, NotificationChannel> = new Map();
  private isEnabled: boolean = true;

  constructor(customer: Customer, notificationType: NotificationType) {
    this.customer = customer;
    this.notificationType = notificationType;

    customer.addNotificationPreference(this);
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public getNotificationType(): NotificationType {
    return this.notificationType;
  }

  public getEnabledChannels(): NotificationChannel[] {
    return Array.from(this.enabledChannels.values());
  }

  public getEnabled(): boolean {
    return this.isEnabled;
  }

  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  public updatePreference(
    channel: NotificationChannel,
    enabled: boolean
  ): void {
    const channelName = channel.constructor.name;

    if (enabled) {
      this.enabledChannels.set(channelName, channel);
    } else {
      this.enabledChannels.delete(channelName);
    }
  }

  public isChannelEnabled(channelName: string): boolean {
    return this.enabledChannels.has(channelName);
  }
}

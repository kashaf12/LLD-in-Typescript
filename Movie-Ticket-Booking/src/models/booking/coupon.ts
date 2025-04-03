export class Coupon {
  private code: string;
  private discount: number;
  private validUntil: Date;
  private isActive: boolean = true;

  constructor(code: string, discount: number, validUntil: Date) {
    this.code = code;
    this.discount = Math.min(100, Math.max(0, discount));
    this.validUntil = validUntil;
  }

  public getCode(): string {
    return this.code;
  }

  public getDiscount(): number {
    return this.discount;
  }

  public getValidUntil(): Date {
    return this.validUntil;
  }

  public isValid(): boolean {
    const now = new Date();
    return this.isActive && this.validUntil >= now;
  }

  public deactivate(): void {
    this.isActive = false;
  }

  public applyDiscount(amount: number): number {
    if (!this.isValid()) {
      return amount;
    }

    const discountAmount = (amount * this.discount) / 100;
    return amount - discountAmount;
  }
}

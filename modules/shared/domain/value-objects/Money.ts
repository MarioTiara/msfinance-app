

import { Currency } from './Currency'

export class Money {
  private constructor(
    private readonly amount: number,
    private readonly currency: Currency
  ) {
    if (amount < 0) {
      throw new Error('Money amount cannot be negative')
    }
  }

  public static create(amount: number, currency: Currency): Money {
    return new Money(Number(amount.toFixed(2)), currency)
  }

  public get value(): number {
    return this.amount
  }

  public getCurrency(): Currency {
    return this.currency
  }

  public add(other: Money): Money {
    if (!this.currency.equals(other.currency)) {
      throw new Error('Cannot add money with different currencies')
    }

    return Money.create(
      this.amount + other.amount,
      this.currency
    )
  }

  public subtract(other: Money): Money {
    if (!this.currency.equals(other.currency)) {
      throw new Error('Cannot subtract money with different currencies')
    }

    return Money.create(
      this.amount - other.amount,
      this.currency
    )
  }

  public equals(other: Money): boolean {
    return (
      this.amount === other.amount &&
      this.currency.equals(other.currency)
    )
  }
}

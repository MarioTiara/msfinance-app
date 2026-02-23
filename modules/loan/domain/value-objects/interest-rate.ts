// interest-rate.ts
export class InterestRate {
  private constructor(private readonly rate: number) {
    if (rate < 0 || rate > 100) {
      throw new Error('Interest rate must be between 0 and 100');
    }
  }

  static create(rate: number): InterestRate {
    return new InterestRate(rate);
  }

  get value(): number {
    return this.rate;
  }
}
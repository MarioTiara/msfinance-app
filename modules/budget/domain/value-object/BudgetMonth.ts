
export class BudgetMonth {
  private constructor(private readonly date: Date) {}

  public static create(date: Date): BudgetMonth {
    const normalized = new Date(date)
    normalized.setDate(1)
    normalized.setHours(0, 0, 0, 0)

    return new BudgetMonth(normalized)
  }

  public get value(): Date {
    return this.date
  }

  public equals(other: BudgetMonth): boolean {
    return this.date.getTime() === other.date.getTime()
  }

  public getYear(): number {
    return this.date.getFullYear()
  }

  public getMonth(): number {
    return this.date.getMonth() + 1
  }
}

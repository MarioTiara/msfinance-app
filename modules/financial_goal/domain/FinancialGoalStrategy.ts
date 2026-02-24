import { Entity } from "@/modules/shared/domain/Entity"
import { GoalFrequency } from "./enums/GoalFrequency"
import { randomUUID } from "crypto"
import { FinancialGoalAllocation } from "./FinancialGoalAllocation"

export interface FinancialGoalStrategyProps {
    goalId: string
    startDate: Date
    endDate?: Date
    frequency: GoalFrequency

    allocations: FinancialGoalAllocation[]
}

export class FinancialGoalStrategy extends Entity<string> {
    private props: FinancialGoalStrategyProps;
    private constructor(props: FinancialGoalStrategyProps) {
        super(randomUUID())
        this.props = props;
    }

    // Factory method (recommended in DDD)
    public static create(props: FinancialGoalStrategyProps): FinancialGoalStrategy {
        return new FinancialGoalStrategy(props)
    }

    // ===== Getters =====
    get goalId(): string {
        return this.props.goalId
    }

    get startDate(): Date {
        return this.props.startDate
    }

    get endDate(): Date | undefined {
        return this.props.endDate
    }

    get frequency(): GoalFrequency {
        return this.props.frequency
    }

    // ===== Business Logic =====

    public close(endDate: Date): void {
        if (endDate <= this.props.startDate) {
            throw new Error("End date must be after start date")
        }

        this.props.endDate = endDate
    }

    public isActive(at: Date = new Date()): boolean {
        const { startDate, endDate } = this.props

        if (at < startDate) return false
        if (endDate && at > endDate) return false

        return true
    }

}
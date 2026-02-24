import { Money } from "@/modules/shared/domain/value-objects/Money"
import { GoalStatus } from "./enums/GoalStatus"
import { AggregateRoot } from "@/modules/shared/domain/aggregate-root"
import { randomUUID } from "crypto"
import { FinancialGoalStrategy } from "./FinancialGoalStrategy"

export interface FinancialGoalProps {
    family_id: string
    name: string
    target_amount: Money
    target_date: Date
    status: GoalStatus
    description?: string
    strategy: FinancialGoalStrategy
}

export class FinancialGoal extends AggregateRoot<FinancialGoalProps, string> {
    private constructor(props: FinancialGoalProps) {
        super(randomUUID(), props)
    }

    static create(props: FinancialGoalProps) {
        return new FinancialGoal(props)
    }

    // ===== Getters =====
    get familyId(): string {
        return this.props.family_id
    }

    get name(): string {
        return this.props.name
    }

    get targetAmount(): Money {
        return this.props.target_amount
    }

    get targetDate(): Date {
        return this.props.target_date
    }

    get status(): GoalStatus {
        return this.props.status
    }

    get description(): string | undefined {
        return this.props.description
    }

    // ===== Behaviors =====
    changeName(newName: string) {
        this.props.name = newName
        this.touch()
    }

    changeTargetDate(newTargetDate: Date) {
        this.props.target_date = newTargetDate
        this.touch()
    }

    changeTargetAmount(newTargetAmount: Money) {
        this.props.target_amount = newTargetAmount
        this.touch()
    }

    changeDescription(newDescription: string) {
        this.props.description = newDescription
        this.touch()
    }
    changeStrategy(newStrategy: FinancialGoalStrategy) {
        this.props.strategy = newStrategy
        this.touch()
    }

}

import { Money } from "@/modules/shared/domain/value-objects/Money"
import { GoalStatus } from "./GoalStatus"
import { Entity } from "@/modules/shared/domain/Entity"

export interface FinancialGoalProps {
    family_id: number
    name: string
    target_amount: Money
    status: GoalStatus
    description?: string
    amount_per_period?: Money
    start_date?: Date
    end_date?: Date
}

export class FinancialGoal extends Entity<number>  {
    private props: FinancialGoalProps

    private constructor(props: FinancialGoalProps, id?: number) {
        super(id)
        this.validate(props)
        this.props = props
    }
    
    static create(props: FinancialGoalProps): FinancialGoal {
        return new FinancialGoal(props)
    }
}

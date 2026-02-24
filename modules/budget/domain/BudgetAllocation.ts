import { Entity } from "@/modules/shared/domain/Entity"
import { Money } from "@/modules/shared/domain/value-objects/Money"
import { randomUUID } from "crypto"

export interface BudgetAllocationProps {
    budgetId: string
    categoryId: string
    allocatedAmount: Money
}

export class BudgetAllocation extends Entity<string> {
    private props: BudgetAllocationProps;

    private constructor(props: BudgetAllocationProps) {
        super(randomUUID())
        this.validate(props)
        this.props = props;
    }

    static create(props: BudgetAllocationProps): BudgetAllocation {
        return new BudgetAllocation(props)
    }

    // ===== validation =====
    private validate(props: BudgetAllocationProps) {
        if (!props.budgetId) {
            throw new Error('Budget ID is required')
        }
        if (!props.categoryId) {
            throw new Error('Category ID is required')
        }
    }

    // ===== Getters =====
    get budgetId(): string {
        return this.props.budgetId
    }

    get categoryId(): string {
        return this.props.categoryId
    }
    get allocatedAmount(): Money {
        return this.props.allocatedAmount
    }

    //Behavior
    changeAmount(newAmount:Money){
        this.props.allocatedAmount=newAmount
    }


}
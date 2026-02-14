import { Money } from "@/modules/shared/domain/value-objects/Money"

export interface BudgetAllocationProps {
    budgetId: number
    categoryId: number
    allocatedAmount: Money
}

export class BudgetAllocation{
    private props: BudgetAllocationProps;

    private constructor(props: BudgetAllocationProps, id?: number) {
        this.validate(props);
        this.props = props;
    }

    static create (props: BudgetAllocationProps): BudgetAllocation {
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
    get budgetId(): number {
        return this.props.budgetId
    }
    
    get categoryId(): number {
        return this.props.categoryId
    }
    get allocatedAmount(): Money {
        return this.props.allocatedAmount
    }


}
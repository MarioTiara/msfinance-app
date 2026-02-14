import { Money } from "@/modules/shared/domain/value-objects/Money"
import { BudgetMonth } from "./value-object/BudgetMonth"
import { Entity } from "@/modules/shared/domain/Entity"
import { Category } from "@/modules/category/domain/Category"

export interface BudgetProps {
    category: Category
    budgetMonth: BudgetMonth
    amount: Money
    createdAt?: Date
    updatedAt?: Date
}

export class Budget extends Entity<number> {
    private props: BudgetProps;

    private constructor(props: BudgetProps, id?: number) {
        super(id)
        this.validate(props);
        this.props = props;
    }

    static create(props: BudgetProps): Budget {
        return new Budget(props)
    }
    // ====== Getters ======
    get categoryId(): string {
        return this.props.category.name
    }

    get budgetMonth(): BudgetMonth {
        return this.props.budgetMonth
    }

    get amount(): Money {
        return this.props.amount
    }

    get createdAt(): Date | undefined {
        return this.props.createdAt
    }

    get updatedAt(): Date | undefined {
        return this.props.updatedAt
    }

    // ===== Business Logic
    public changeAmount(newAmount: Money) {
        this.props.amount = newAmount
        this.props.updatedAt = new Date()
    }

    // ===== Validation =====
    private validate(props: BudgetProps) {
        if (!props.category || !props.category.id) {
            throw new Error('Category is required')
        }
    }

}
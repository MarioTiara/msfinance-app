import { Money } from "@/modules/shared/domain/value-objects/Money"
import { BudgetMonth } from "./value-object/BudgetMonth"
import { Category } from "@/modules/category/domain/Category"
import { AggregateRoot } from "@/modules/shared/domain/aggregate-root"
import { randomUUID } from "crypto"

export interface BudgetProps {
    category: Category
    budgetMonth: BudgetMonth
    amount: Money
    createdAt?: Date
    updatedAt?: Date
}

export class Budget extends AggregateRoot<BudgetProps, string>{

    private constructor(props: BudgetProps) {
        super(randomUUID(), props)
        this.validate(props);
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
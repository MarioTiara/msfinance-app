import { Money } from "@/modules/shared/domain/value-objects/Money"
import { AggregateRoot } from "@/modules/shared/domain/aggregate-root"
import { randomUUID } from "crypto"

export interface BudgetProps {
    familyId: string
    categoryId: string

    name: string
    startDate: Date
    endDate: Date

    totalAmount: Money

}

export class Budget extends AggregateRoot<BudgetProps, string> {

    private constructor(props: BudgetProps) {
        super(randomUUID(), props)
    }

    static create(props: BudgetProps): Budget {
        return new Budget(props)
    }
    // ====== Getters ======
    get categoryId(): string {
        return this.props.categoryId
    }

    get totalAmount(): Money {
        return this.props.totalAmount
    }


}
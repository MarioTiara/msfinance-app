import { Entity } from "@/modules/shared/domain/Entity";
import { Money } from "@/modules/shared/domain/value-objects/Money";
import { UserId } from "@/modules/familiy/domain/value-objects/UserId";

export interface TransactionProps {
    id: number
    userId: UserId
    categoryId: number
    transactionDate: Date
    transaction_type: TransactionType
    amount: Money
    description: string
    createdAt?: Date
    updatedAt?: Date
}

export class Transaction extends Entity<number> {
    private props: TransactionProps
    constructor(props: TransactionProps) {
        super(props.id)
        this.validate(props)
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date()
        }
    }

    // ===== Getters =====
    get userId(): UserId {
        return this.props.userId
    }

    get categoryId(): number {
        return this.props.categoryId
    }

    get transactionDate(): Date {
        return this.props.transactionDate
    }

    get amount(): Money {
        return this.props.amount
    }

    get description(): string | undefined {
        return this.props.description
    }

    get createdAt(): Date {
        return this.props.createdAt!
    }

    get updatedAt(): Date {
        return this.props.updatedAt!
    }

    // ===== Business Methods =====
    public changeAmount(amount: Money) {
        this.props.amount = amount
        this.touch()
    }

    public changeDescription(desc: string) {
        this.props.description = desc;
        this.touch()
    }

    public changeTransactionDate(date: Date) {
        this.props.transactionDate = date;
        this.touch()
    }
    private touch() {
        this.props.updatedAt = new Date()
    }

    // ===== Validation =====
    private validate(props: TransactionProps) {
        if (!props.userId) throw new Error('User is required')
        if (!props.categoryId) throw new Error('Category is required')
        if (!props.amount) throw new Error('Amount is required')
        if (props.amount.value <= 0) throw new Error('Transaction amount must be greater than zero')
    }

}
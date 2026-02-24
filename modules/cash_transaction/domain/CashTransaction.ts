import { Money } from "@/modules/shared/domain/value-objects/Money";
import { AggregateRoot } from "@/modules/shared/domain/aggregate-root";
import { randomUUID } from "crypto";

export interface CashTransactionProps {
    userId: string
    transaction_type: TransactionType
    allocationId?: string

    transactionDate: Date
    amount: Money
    description?: string
}

export class CashTransaction extends AggregateRoot<CashTransactionProps, string> {
    private constructor(props: CashTransactionProps) {
        super(randomUUID(), props)
        this.validate(props)
    }

    // ===== Factory Method =====
    static create(props: CashTransactionProps): CashTransaction {
        return new CashTransaction(props)
    }

    // ===== Getters =====
    get userId(): string {
        return this.props.userId
    }

    get allocationId(): string  | undefined {
        return this.props.allocationId
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

    // ===== Business Methods =====
    public changeAmount(amount: Money) {
        this.props.amount = amount
        this.touch()
    }

    public changeDescription(desc: string) {
        this.props.description = desc;
        this.touch()
    }

    // ===== Validation =====
    private validate(props: CashTransactionProps) {
        if (!props.userId) throw new Error('User is required')
        if (!props.amount) throw new Error('Amount is required')
        if (props.amount.value <= 0) throw new Error('Transaction amount must be greater than zero')
    }

}
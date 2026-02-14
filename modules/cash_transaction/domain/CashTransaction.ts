import { Entity } from "@/modules/shared/domain/Entity";
import { Money } from "@/modules/shared/domain/value-objects/Money";
import { UserId } from "@/modules/familiy/domain/value-objects/UserId";

export interface CashTransactionProps {
    userId: UserId
    transaction_type: TransactionType
    allocationId?: number

    transactionDate: Date
    amount: Money
    description?: string
}

export class CashTransaction extends Entity<number> {
    private props: CashTransactionProps;
    private constructor(props: CashTransactionProps, id?: number) {
        super(id)
        this.validate(props)
        this.props = props;
    }

    // ===== Factory Method =====
    static create(props: CashTransactionProps): CashTransaction {
        return new CashTransaction(props)
    }

    // ===== Getters =====
    get userId(): UserId {
        return this.props.userId
    }

    get allocationId(): number | undefined {
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

    public changeTransactionDate(date: Date) {
        this.props.transactionDate = date;
        this.touch()
    }

    // ===== Validation =====
    private validate(props: CashTransactionProps) {
        if (!props.userId) throw new Error('User is required')
        if (!props.amount) throw new Error('Amount is required')
        if (props.amount.value <= 0) throw new Error('Transaction amount must be greater than zero')
    }

}
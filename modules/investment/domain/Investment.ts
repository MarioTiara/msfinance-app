
import { InvestmentTransactionType } from "./InvestmentTransactionType"
import { Money } from "@/modules/shared/domain/value-objects/Money"
import { AggregateRoot } from "@/modules/shared/domain/aggregate-root"
import { randomUUID } from "crypto"


export interface InvestmentProps {
    userId: string
    name: string
    transactionType: InvestmentTransactionType
    goal_id?: string
    quantity?: number
    unit?: string
    pricePerUnit?: number
    totalAmount: Money
    fee?: Money
    tax?: Money
    transactionDate: Date
    description?: string
}

export class Investment extends AggregateRoot<InvestmentProps, string> {
    private constructor(props: InvestmentProps) {
        super(randomUUID(), props)
        this.validate(props)
    }

    static create(props: InvestmentProps) {
        return new Investment(props)
    }

    // ===== Getters =====
    get userId(): string {
        return this.props.userId
    }

    get name(): string {
        return this.props.name
    }

    get transactionType(): InvestmentTransactionType {
        return this.props.transactionType
    }

    get quantity(): number | undefined {
        return this.props.quantity
    }

    get unit(): string | undefined {
        return this.props.unit
    }

    get pricePerUnit(): number | undefined {
        return this.props.pricePerUnit
    }

    get totalAmount(): Money {
        return this.props.totalAmount
    }

    get fee(): Money | undefined {
        return this.props.fee
    }

    get tax(): Money | undefined {
        return this.props.tax
    }

    get transactionDate(): Date {
        return this.props.transactionDate
    }

    get description(): string | undefined {
        return this.props.description
    }


    // ===== Business Methods =====
    /** Total cash out including fee and tax */
    public getTotalCashOut(): number {
        const feeValue = this.fee?.value ?? 0
        const taxValue = this.tax?.value ?? 0
        return this.totalAmount.value + feeValue + taxValue
    }

    /** Update fee */
    public setFee(fee: Money) {
        this.props.fee = fee
        this.touch()
    }

    /** Update tax */
    public setTax(tax: Money) {
        this.props.tax = tax
        this.touch()
    }

    /** Update quantity or price per unit */
    public updateQuantityOrPrice(quantity?: number, pricePerUnit?: number) {
        if (quantity !== undefined) this.props.quantity = quantity
        if (pricePerUnit !== undefined) this.props.pricePerUnit = pricePerUnit
        this.touch()
    }


    private validate(props: InvestmentProps) {
        if (!props.userId) throw new Error('UserId is required')
        if (!props.name) throw new Error('Investment name is required')
        if (!props.transactionType) throw new Error('Transaction type is required')
        if (!props.totalAmount) throw new Error('Total amount is required')
        if (!props.transactionDate) throw new Error('Transaction date is required')
    }
}
import { UserId } from "@/modules/familiy/domain/value-objects/UserId"
import { InvestmentTransactionType } from "./InvestmentTransactionType"
import { Money } from "@/modules/shared/domain/value-objects/Money"
import { Entity } from "@/modules/shared/domain/Entity"

export interface InvestmentProps {
    id?: number
    userId: UserId
    categoryId: number
    name: string
    transactionType: InvestmentTransactionType
    quantity?: number
    unit?: string                  // optional, misal 'lot', 'gram', 'unit'
    pricePerUnit?: number
    totalAmount: Money
    fee?: Money
    tax?: Money
    transactionDate: Date
    description?: string
    createdAt?: Date
    updatedAt?: Date
}


export class Investment extends Entity<number> {
    private props: InvestmentProps

    constructor(props: InvestmentProps) {
        super(props.id)
        this.validate(props)
        this.props = {
            ...props,
            createdAt: props.createdAt ?? new Date(),
            updatedAt: props.updatedAt ?? new Date(),
        }
    }

    // ===== Getters =====
    get userId(): UserId {
        return this.props.userId
    }

    get categoryId(): number {
        return this.props.categoryId
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

    get createdAt(): Date {
        return this.props.createdAt!
    }

    get updatedAt(): Date {
        return this.props.updatedAt!
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

    /** Update timestamp helper */
    private touch() {
        this.props.updatedAt = new Date()
    }

    private validate(props: InvestmentProps) {
        if (!props.userId) throw new Error('UserId is required')
        if (!props.categoryId) throw new Error('CategoryId is required')
        if (!props.name) throw new Error('Investment name is required')
        if (!props.transactionType) throw new Error('Transaction type is required')
        if (!props.totalAmount) throw new Error('Total amount is required')
        if (!props.transactionDate) throw new Error('Transaction date is required')
    }
}
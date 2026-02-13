import { Currency } from "@/modules/shared/domain/value-objects/Currency"
import { AccountType } from "./AccountType"
import { Entity } from "@/modules/shared/domain/Entity"
import { Money } from "@/modules/shared/domain/value-objects/Money"

export interface AccountProps {
    id?: number
    userId: number
    accountId: string
    name: string
    type?: AccountType
    currency?: Currency
    balance: Money
    description?: string
    createdAt?: Date
    updatedAt?: Date
}

export class Account extends Entity<number> {
    private props: AccountProps

    private constructor(props: AccountProps) {
        super(props.id)

        this.validate(props)
        this.props =props;
    }


    private validate(props: AccountProps) {
        if (!props.userId) {
            throw new Error('Account must have userId')
        }

        if (!props.name || props.name.trim().length === 0) {
            throw new Error('Account name is required')
        }

        if (props.name.length > 100) {
            throw new Error('Account name max 100 characters')
        }
    }

    static create(props: Omit<AccountProps,"id"| "createdAt" | "updatedAt">): Account{
        const now= new Date()
        return new Account({
            ...props,
            createdAt:now,
            updatedAt:now
        })
    }

    // Getters
    get id() {
        return this.props.id
    }

    get userId() {
        return this.props.userId
    }

    get accountId() {
        return this, this.props.accountId
    }

    get name() {
        return this.props.name
    }

    get type() {
        return this.props.type!
    }

    get currency() {
        return this.props.currency!
    }

    get description() {
        return this.props.description
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    // Behavior
    public rename(newName: string) {
        if (!newName || newName.trim().length === 0) {
            throw new Error('Account name cannot be empty')
        }

        this.props.name = newName
        this.touch()
    }

    public updateBalance(newBalance: Money) {
        this.props.balance = newBalance
    }

    public deposit(amount: Money) {
        this.ensureSameCurrency(amount)

        if (amount.value < 0) {
            throw new Error('Deposit amount must be positive')
        }

        this.props.balance = this.props.balance.add(amount)
        this.touch()
    }

    public withdraw(amount: Money) {
        this.ensureSameCurrency(amount)

        if (amount.value < 0) {
            throw new Error('Withdraw amount must be positive')
        }

        if (this.props.balance.value < 0) {
            throw new Error('Insufficient balance')
        }

        this.props.balance = this.props.balance.subtract(amount)
        this.touch()
    }

    private ensureSameCurrency(amount: Money) {
        if (!amount.getCurrency().equals(this.currency)) {
            throw new Error('Currency mismatch')
        }
    }
    private touch() {
        this.props.updatedAt = new Date()
    }
}


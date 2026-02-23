import { AggregateRoot } from "@/modules/shared/domain/aggregate-root";
import { LoanProps } from "./Loan.types";
import { LoanStatus } from "./enums/Loan-status";
import { PaymentScheme } from "./enums/payment-scheme";
import { Money } from "@/modules/shared/domain/value-objects/Money";
import { InterestRate } from "./value-objects/interest-rate";

export class Loan extends AggregateRoot<LoanProps, number> {
    private constructor(id: number, props: LoanProps) {
        super(id, props)
    }

    // Factory for creating new Loan
    static create(
        id: number,
        props: Omit<LoanProps, 'status' | 'createdAt' | 'updatedAt'>,
    ): Loan {
        if (props.startDate >= props.endDate) {
            throw new Error('Start date must be before end date');
        }

        if (
            props.paymentScheme === PaymentScheme.INSTALLMENT &&
            !props.installmentTenorMonths
        ) {
            throw new Error('Installment tenor required');
        }

        const now = new Date();

        return new Loan(id, {
            ...props,
            status: LoanStatus.ACTIVE,
        });
    }

    // ===== Domain Behavior =====

    markAsPaidOff(): void {
        if (this.props.status === LoanStatus.PAID_OFF) {
            throw new Error('Loan already paid off');
        }

        this.props.status = LoanStatus.PAID_OFF;
        this.touch();
    }

    rename(newName: string): void {
        if (!newName.trim()) {
            throw new Error('Name cannot be empty');
        }

        this.props.name = newName;
        this.touch();
    }

    isActive(): boolean {
        return this.props.status === LoanStatus.ACTIVE;
    }

    // ====== Getters ==========
    get name(): string {
        return this.props.name;
    }

    get accountId():number{
        return this.props.accountId;
    }
    get status(): LoanStatus {
        return this.props.status;
    }

    get principal(): Money {
        return this.props.principalAmount;
    }

    get userHolderId():number{
        return this.props.userHolderId;
    }

    get payable(): Money{
        return this.props.totalPayableAmount;
    }

    get paymentScheme(): PaymentScheme{
        return this.props.paymentScheme;
    }

    get interest(): InterestRate| undefined{
        return this.props.interestRate;
    }

    get tenorMonths():number | undefined{
        return this.props.installmentTenorMonths
    }


}
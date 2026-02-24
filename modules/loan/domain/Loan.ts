import { AggregateRoot } from "@/modules/shared/domain/aggregate-root";
import { LoanProps } from "./Loan.types";
import { LoanStatus } from "./enums/Loan-status";
import { PaymentScheme } from "./enums/payment-scheme";
import { Money } from "@/modules/shared/domain/value-objects/Money";
import { randomUUID } from 'crypto';
import { LoanInstallment } from "./Loan-installment";

export class Loan extends AggregateRoot<LoanProps, string> {
    private constructor(props: LoanProps) {
        super(randomUUID(), props)
    }

    // Factory for creating new Loan
    static create(
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

        return new Loan({
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

    generateInstallments() {
        if (this.paymentScheme == PaymentScheme.FULL) {
            this.props.installments.push(LoanInstallment.create({
                loandId: this._id,
                installmentNo: 1,
                dueDate: this.props.endDate,
                totalAmount: this.props.monthlyAmount,
                isPaid: false,
            }))
        }

        else if (this.paymentScheme == PaymentScheme.INSTALLMENT) {
            for (let i = 1; i <= this.props.installmentTenorMonths; i++) {
                this.props.installments.push(LoanInstallment.create({
                    loandId: this._id,
                    installmentNo: i,
                    dueDate: this.calculateDueDate(i),
                    totalAmount: this.props.monthlyAmount,
                    isPaid: false,
                }))
            }
        }


    }

    private calculateDueDate(installmentNo: number): Date {
        const totalMonths = this.props.installmentTenorMonths
        const monthSpan = Math.floor((this.props.endDate.getTime() - this.props.startDate.getTime()) / (1000 * 60 * 60 * 24 * 30))

        const due = new Date(this.props.startDate)
        due.setMonth(due.getMonth() + installmentNo - 1)
        due.setDate(this.props.endDate.getDate()) // sesuaikan dengan tanggal akhir
        return due
    }
    // ====== Getters ==========
    get name(): string {
        return this.props.name;
    }

    get accountId(): number {
        return this.props.accountId;
    }
    get status(): LoanStatus {
        return this.props.status;
    }

    get principal(): Money {
        return this.props.principalAmount;
    }

    get userHolderId(): number {
        return this.props.userHolderId;
    }

    get payable(): Money {
        return this.props.monthlyAmount.multiplay(this.props.installmentTenorMonths);
    }

    get paymentScheme(): PaymentScheme {
        return this.props.paymentScheme;
    }


    get tenorMonths(): number | undefined {
        return this.props.installmentTenorMonths
    }

    get installments(): LoanInstallment[] {
        return this.props.installments
    }


}
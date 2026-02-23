import { Entity } from "@/modules/shared/domain/Entity"
import { Money } from "@/modules/shared/domain/value-objects/Money"
import { InstallmentStatus } from "./enums/installment-status"

export interface LoanInstallmentProps {
    loanId: number
    installmentNo: number
    dueDate: Date
    principalAmount: Money
    interestAmount: Money
    adminFee?: Money
    paidTransactionId?: number
    paidDate?: Date
    isPaid: boolean

}

export class LoanInstallment extends Entity<number> {
    private props: LoanInstallmentProps;
    private constructor(props: LoanInstallmentProps, id?: number) {
        super(id)
        this.props = props;
    }

    static create(props: LoanInstallmentProps) {
        return new LoanInstallment(props)
    }

    // ============ Behavior ==========
    receivePayment(amount: Money, transactionId: number) {
        if (!amount.equals(this.totalAmount)) {
            throw new Error("Payment amount does not match total billing")
        }

        this.props.isPaid = true;
        this.props.paidDate = new Date();
        this.props.paidTransactionId = transactionId;
        this.touch();
    }

    getStatus(today: Date = new Date()): InstallmentStatus {
        if (this.props.isPaid) {
            return InstallmentStatus.PAID
        }

        const dueMonthNumber = this.props.dueDate.getMonth()
        const dueYear = this.props.dueDate.getFullYear()
        const currentMonth = today.getMonth()
        const currentYear = today.getFullYear()

        if (currentYear < dueYear || (currentYear === dueYear && currentMonth < dueMonthNumber)) {
            return InstallmentStatus.UNBILLED;
        } else if (currentYear === dueYear && currentMonth === dueMonthNumber) {
            return InstallmentStatus.BILLED;
        } else {
            return InstallmentStatus.BILLED;
        }
    }

    // ============ Getter ============
    get installmentNo(): number {
        return this.props.installmentNo
    }

    get dueDare(): Date {
        return this.props.dueDate
    }

    get principalAmount(): Money {
        return this.props.principalAmount
    }

    get interestAmount(): Money {
        return this.props.interestAmount
    }

    get adminFee(): Money | undefined {
        return this.props.adminFee
    }

    get totalAmount(): Money {
        const total = this.props.principalAmount.add(this.props.interestAmount);
        return this.props.adminFee ? total.add(this.props.adminFee) : total
    }

    get status(): InstallmentStatus {
        return this.getStatus()
    }

}

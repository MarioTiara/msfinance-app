import { Entity } from "@/modules/shared/domain/Entity"
import { Money } from "@/modules/shared/domain/value-objects/Money"
import { InstallmentStatus } from "./enums/installment-status"
import { randomUUID } from "crypto"

export interface LoanInstallmentProps {
    loandId: string
    installmentNo: number
    dueDate: Date
    totalAmount: Money
    isPaid: boolean
    paid_amount?: Money
    paidDate?: Date
    paidTransactionId?: number
}

export class LoanInstallment extends Entity<string> {
    private props: LoanInstallmentProps;
    private constructor(props: LoanInstallmentProps, id?: number) {
        super(randomUUID())
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

    get dueDate(): Date {
        return this.props.dueDate
    }

    get totalAmount(): Money {
        return this.props.totalAmount;
    }

    get isPaid(): boolean {
        return this.props.isPaid;
    }

    get paidDate(): Date | undefined {
        return this.props.paidDate;
    }

    get paidAmount(): Money | undefined {
        return this.props.paid_amount;
    }
    get paymentTransactionId(): number | undefined {
        return this.props.paidTransactionId
    }

    get status(): InstallmentStatus {
        return this.getStatus()
    }

}

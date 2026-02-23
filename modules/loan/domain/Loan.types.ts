import { Money } from "@/modules/shared/domain/value-objects/Money";
import { LoanType } from "./enums/Loan-type";
import { PaymentScheme } from "./enums/payment-scheme";
import { InterestType } from "./enums/interest-type";
import { InterestRate } from "./value-objects/interest-rate";
import { LoanStatus } from "./enums/Loan-status";


export interface LoanProps {
  /**
   * Reference to the Account aggregate where this loan is recorded.
   * This is an external aggregate reference (by identity only).
   */
  accountId: number;

  /**
   * Reference to the User who legally owns / holds this loan.
   * Used for authorization and ownership validation.
   */
  userHolderId: number;

  /**
   * Human-readable loan name.
   * Example: "BCA Home Loan 2025" or "Visa Platinum Card".
   */
  name: string;

  /**
   * Original principal borrowed amount (before interest).
   * Immutable after loan creation.
   */
  principalAmount: Money;

  /**
   * Total amount that must be repaid including interest.
   * Used to calculate installment value.
   */
  totalPayableAmount: Money;

  /**
   * Loan provider category.
   * Example: bank loan or credit card liability.
   */
  type: LoanType;

  /**
   * Determines how the loan is repaid.
   * FULL = single payment
   * INSTALLMENT = multiple scheduled payments
   */
  paymentScheme: PaymentScheme;

  /**
   * Defines how interest is calculated.
   * FIXED = constant rate
   * FLOATING = rate may change over time
   */
  interestType: InterestType;

  /**
   * Interest percentage applied to the loan.
   * Required for most loans except certain full-payment credit card types.
   */
  interestRate?: InterestRate;

  /**
   * Number of months for installment repayment.
   * Required if paymentScheme is INSTALLMENT.
   */
  installmentTenorMonths?: number;

  /**
   * Date when the loan becomes active / starts accruing.
   */
  startDate: Date;

  /**
   * Expected completion date of the loan.
   * Must be after startDate.
   */
  endDate: Date;

  /**
   * Current lifecycle state of the loan.
   * ACTIVE = still ongoing
   * PAID_OFF = fully repaid
   */
  status: LoanStatus;
}
import { InstrumentType } from "@/modules/instrument/domain/InstrumentType"
import { Entity } from "@/modules/shared/domain/Entity"
import { Money } from "@/modules/shared/domain/value-objects/Money"
import { randomUUID } from "crypto"

export interface FinancialGoalAllocationProps {
    strategyId: string
    instrumentType: InstrumentType
    allocationAmount: Money
}

export class FinancialGoalAllocation extends Entity<string> {
    private props: FinancialGoalAllocationProps;
    private constructor(props: FinancialGoalAllocationProps) {
        super(randomUUID());
        this.props = props;
    }

    static create(props: FinancialGoalAllocationProps) {
        return new FinancialGoalAllocation(props);
    }

    get strategyId(): string {
        return this.props.strategyId;
    }
    get instrumentType(): InstrumentType {
        return this.props.instrumentType;
    }
    get amount(): Money {
        return this.props.allocationAmount;
    }
}   
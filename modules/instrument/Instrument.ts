import { randomUUID } from "crypto";
import { AggregateRoot } from "../shared/domain/aggregate-root";
import { Money } from "../shared/domain/value-objects/Money";
import { InstrumentType } from "./domain/InstrumentType";

export interface InstrumentProps {
    type: InstrumentType
    name :string
    current_price: Money
}

export class Instruments extends AggregateRoot<InstrumentProps,string>{

    private constructor(props: InstrumentProps) {
        super(randomUUID(), props)
    }

    // ===== Factory Method =====
    static create(props: InstrumentProps): Instruments {
        return new Instruments(props)
    }

    // ===== Getters =====
    get type(): InstrumentType {
        return this.props.type
    }
    
    get name(): string {
        return this.props.name
    }
    get current_price(): Money {
        return this.props.current_price
    }

}
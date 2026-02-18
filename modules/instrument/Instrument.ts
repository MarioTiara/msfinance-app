import { Entity } from "../shared/domain/Entity";
import { Money } from "../shared/domain/value-objects/Money";
import { InstrumentType } from "./domain/InstrumentType";

export interface IntrumentProps {
    type: InstrumentType
    name :string
    current_price: Money
}

export class Instruments extends Entity <number>{
    private props: IntrumentProps

    private constructor(props: IntrumentProps, id?: number) {
        super(id)
        this.props = props
    }

    // ===== Factory Method =====
    static create(props: IntrumentProps): Instruments {
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
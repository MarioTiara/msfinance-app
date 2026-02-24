import { ValueDirection } from "../ValueDirection";

export class ValuationPolicy {
    private diection: ValueDirection;
    private annualRate: number;

    private constructor(direction: ValueDirection, annualRate: number) {
        this.diection = direction;
        this.annualRate = annualRate;
    }

    static create(direction: ValueDirection, annualRate: number): ValuationPolicy {
        return new ValuationPolicy(direction, annualRate);
    }

    get direction(): ValueDirection {
        return this.diection;
    }
    
    get rate(): number {
        return this.annualRate;
    }
}

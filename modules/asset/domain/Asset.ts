import { Entity } from "@/modules/shared/domain/Entity";
import { AssetType } from "./AssetType";
import { ValuationPolicy } from "./value-objects/ValuationPolicy";

export interface AssetProps {
    familyId: number;

    name: string;
    assetType: AssetType; 
    quantity: number;
    unit: string;

    valuuationPolicy?: ValuationPolicy

    estimatedValue: number;
    description?: string;
    acquiredDate?: Date;
    createdByUserId: number;
}

export class Asset extends Entity<number> {
    private props: AssetProps;

    private constructor(props: AssetProps, id?: number) {
        super(id);
        this.validate(props);
        this.props = props;
    }

    /* =====================
       VALIDATION
    ====================== */

    private validate(props: AssetProps) {
        if (!props.name || props.name.trim().length === 0) {
            throw new Error("Asset name is required");
        }

        if (props.estimatedValue < 0) {
            throw new Error("Estimated value cannot be negative");
        }

        if (props.quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
        }
    }
    /* =====================
       FACTORY
    ====================== */

    static create(props: AssetProps): Asset {
        return new Asset({
            ...props,
            quantity: props.quantity ?? 1,
        });
    }

    /* =====================
       DOMAIN BEHAVIOR
    ====================== */

    changeName(name: string) {
        if (!name || name.trim().length === 0) {
            throw new Error("Asset name is required");
        }
        this.props.name = name;
        this.touch();
    }

    updateEstimatedValue(value: number) {
        if (value < 0) {
            throw new Error("Estimated value cannot be negative");
        }
        this.props.estimatedValue = value;
        this.touch();
    }

    changeQuantity(quantity: number) {
        if (quantity <= 0) {
            throw new Error("Quantity must be greater than zero");
        }
        this.props.quantity = quantity;
        this.touch();
    }

    /* =====================
       GETTERS
    ====================== */
    get familyId() {
        return this.props.familyId;
    }

    get totalValue() {
        return this.props.estimatedValue * this.props.quantity;
    }

    get snapshot(): AssetProps {
        return { ...this.props };
    }
}
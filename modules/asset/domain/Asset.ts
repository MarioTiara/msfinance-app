import { AssetType } from "./AssetType";

export interface AssetProps {
    id: number;
    familyId: number;
    accountId?: number | null;

    name: string;
    assetType: AssetType; 
    estimatedValue: number;
    quantity: number;
    unit: string;

    description?: string;
    acquiredDate?: Date;

    createdAt: Date;
    updatedAt: Date;
}

export class Asset {
    private props: AssetProps;

    private constructor(props: AssetProps) {
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

    static create(props: Omit<AssetProps, "createdAt" | "updatedAt" | "quantity"> & {
        quantity?: number;
    }): Asset {
        const now = new Date();

        return new Asset({
            ...props,
            accountId: props.accountId ?? null,
            quantity: props.quantity ?? 1,
            createdAt: now,
            updatedAt: now,
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

    private touch() {
        this.props.updatedAt = new Date();
    }

    /* =====================
       GETTERS
    ====================== */

    get id() {
        return this.props.id;
    }

    get familyId() {
        return this.props.familyId;
    }

    get accountId() {
        return this.props.accountId;
    }

    get totalValue() {
        return this.props.estimatedValue * this.props.quantity;
    }

    get snapshot(): AssetProps {
        return { ...this.props };
    }
}
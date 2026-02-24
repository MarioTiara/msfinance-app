import { Entity } from "@/modules/shared/domain/Entity";
import { FamilyName } from "./value-objects/FamiliyName";
import { AggregateRoot } from "@/modules/shared/domain/aggregate-root";
import { randomUUID } from "crypto";


export interface FamiliyProps {
    Name: FamilyName
}

export class Familiy extends AggregateRoot<FamiliyProps, string> {

    private constructor(props: FamiliyProps) {
        super(randomUUID(), props);
    }

    static create(props: FamiliyProps) {
        return new Familiy(props)
    }

    rename(newName: FamilyName) {
        this.props.Name = newName;
    }
}
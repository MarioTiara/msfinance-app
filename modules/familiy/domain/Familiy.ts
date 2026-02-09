import { Entity } from "@/modules/shared/domain/Entity";
import { FamilyId } from "./value-objects/FamilyId";
import { FamilyName } from "./value-objects/FamiliyName";

export class Familiy extends Entity<FamilyId>{
    public name: FamilyName;
    public readonly createdAt: Date;

    constructor(id: FamilyId, name: FamilyName) {
        super(id);
        this.name = name;
        this.createdAt = new Date();
    }

    rename(newName: FamilyName) {
        this.name = newName;
    }
}
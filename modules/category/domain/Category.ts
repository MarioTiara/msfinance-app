import { Entity } from "@/modules/shared/domain/Entity"
import { CategoryType } from "./CategoryType";

export class Category extends Entity<number> {
    public name: string;
    public readonly createdAt: Date;
    public type: CategoryType;
    public parentId: number | null
    constructor(id: number, name: string, type: CategoryType, parentId: number | null) {
        super(id)
        this.name = this.validName(name)
        this.type = this.validType(type);
        this.createdAt = new Date()
        this.parentId = parentId;
    }

    // ===== Business Logic =====
    public isRoot(): boolean {
        return !this.parentId;
    }

    public rename(newName: string) {
        this.name = this.validName(newName);
    }

    public changeType(newType:CategoryType){
        this.type= this.validType(newType);
    }

    //============= validations==================
    private validName(name: string): string {
        if (!name || name.trim().length < 2) {
            throw new Error('category name must be at least 2 characters')
        }
        return name.trim();
    }

    private validType(type: CategoryType): CategoryType {
        if (!Object.values(CategoryType).includes(type)) {
            throw new Error('Invalid category type')
        }
        return type;
    }
}
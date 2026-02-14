import { Entity } from "@/modules/shared/domain/Entity"
import { CategoryType } from "./CategoryType";

interface CategoryProps {
    name: string;
    type: CategoryType;
    parentId: number | null;
}

export class Category extends Entity<number> {
    private props: CategoryProps;
    private constructor(props: CategoryProps, id?: number) {
        super(id)
        this.validate(props);
        this.props = props;
    }


    /**
     * Factory method to create a new Category instance.
     * This method encapsulates the creation logic, providing a clear and consistent way to instantiate a Category object.
     * @param props - The properties for the new category, conforming to the CategoryProps interface.
     * @returns A new instance of the Category class.
     */
    static create(props: CategoryProps):Category{
        return new Category(props);
    }

    
    // ===== Getters =====
    get name(): string {
        return this.props.name;
    }
    
    get type(): CategoryType {
        return this.props.type;
    }

    get parentId(): number | null {
        return this.props.parentId;
    }

    // ===== Business Logic =====
    public isRoot(): boolean {
        return !this.props.parentId;
    }

    public rename(newName: string) {
        this.props.name = this.validName(newName);
    }

    public changeType(newType: CategoryType) {
        this.props.type = this.validType(newType);
    }

    //============= validations==================

    private validate(props: CategoryProps) {
        props.name = this.validName(props.name);
        props.type = this.validType(props.type);
    }


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
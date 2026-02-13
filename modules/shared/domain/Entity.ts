export abstract class Entity<T> {
    protected readonly _id?: T
    protected _updatedAt?: Date
    private _createdAt?: Date
    constructor(id?: T) {
        this._id = id
        this._createdAt = new Date()
        this._updatedAt = new Date()
    }

    get id(): T | undefined {
        return this._id
    }

    get createdAt(): Date | undefined {
        return this._createdAt
    }

    get updatedAt(): Date | undefined {
        return this._updatedAt
    }

    public touch() {
        this._updatedAt = new Date()
    }

    public equals(entity?: Entity<T>): boolean {
        if (!entity) return false
        if (this === entity) return true
        return this._id === entity._id
    }
}
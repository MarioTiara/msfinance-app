export abstract class Entity<T> {
    protected readonly _id?: T

    constructor(id?: T) {
        this._id = id
    }

    get id(): T | undefined {
        return this._id
    }

    public equals(entity?: Entity<T>): boolean {
        if (!entity) return false
        if (this === entity) return true
        return this._id === entity._id
    }
}
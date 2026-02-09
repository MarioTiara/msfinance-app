export abstract class Entity<T> {
    protected constructor(
        public readonly id:T
    ){}
}
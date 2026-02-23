import { Entity } from "./Entity"

// aggregate-root.ts
export abstract class AggregateRoot<Props, Id> extends Entity<Id> {
  protected props: Props

  private _domainEvents: any[] = []

  protected constructor(id: Id, props: Props) {
    super(id)
    this.props = props
  }

  protected addDomainEvent(event: any) {
    this._domainEvents.push(event)
  }

  public pullDomainEvents(): any[] {
    const events = this._domainEvents
    this._domainEvents = []
    return events
  }
}
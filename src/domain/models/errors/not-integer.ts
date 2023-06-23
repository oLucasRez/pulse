import { DomainError } from '@domain/models/errors';

export class NotIntegerError extends DomainError {
  public readonly metadata: NotIntegerError.Metadata;

  constructor({
    metadata,
    message = `{${metadata.prop}} must be integer`,
  }: NotIntegerError.ConstructorProps) {
    super({ message });

    this.metadata = metadata;

    Object.setPrototypeOf(this, NotIntegerError.prototype);
  }
}

export namespace NotIntegerError {
  export type Metadata = { prop: string; value: number };

  export type ConstructorProps = DomainError.ConstructorProps & {
    metadata: Metadata;
  };
}

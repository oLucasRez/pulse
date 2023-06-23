import { DomainError } from '@domain/models/errors';

export class NotPositiveError extends DomainError {
  public readonly metadata: NotPositiveError.Metadata;

  constructor({
    metadata,
    message = `{${metadata.prop}} must be positive`,
  }: NotPositiveError.ConstructorProps) {
    super({ message });

    this.metadata = metadata;

    Object.setPrototypeOf(this, NotPositiveError.prototype);
  }
}

export namespace NotPositiveError {
  export type Metadata = { prop: string; value: number };

  export type ConstructorProps = DomainError.ConstructorProps & {
    metadata: Metadata;
  };
}

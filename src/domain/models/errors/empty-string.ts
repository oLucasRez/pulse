import { DomainError } from '@domain/models/errors';

export class EmptyStringError extends DomainError {
  public readonly metadata: EmptyStringError.Metadata;

  constructor({
    metadata,
    message = `{${metadata.prop}} is empty`,
  }: EmptyStringError.ConstructorProps) {
    super({ message });

    this.metadata = metadata;

    Object.setPrototypeOf(this, EmptyStringError.prototype);
  }
}

export namespace EmptyStringError {
  export type Metadata = { prop: string; value: string };

  export type ConstructorProps = DomainError.ConstructorProps & {
    metadata: Metadata;
  };
}

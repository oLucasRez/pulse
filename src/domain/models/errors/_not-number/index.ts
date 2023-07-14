import { DomainError } from '@domain/errors';

export class NotNumberError extends DomainError {
  public readonly metadata: NotNumberError.Metadata;

  constructor({
    metadata,
    message = `{${metadata.prop}} must be a number`,
  }: NotNumberError.ConstructorProps) {
    super({ message });

    this.metadata = metadata;

    Object.setPrototypeOf(this, NotNumberError.prototype);
  }
}

export namespace NotNumberError {
  export type Metadata = { prop: string; value: any };

  export type ConstructorProps = DomainError.ConstructorProps & {
    metadata: Metadata;
  };
}

import { DomainError } from '@domain/errors';

type Metadata = { prop: string; value: any };

type ConstructorProps = {
  message?: string;
  metadata: Metadata;
};

export class NotNumberError extends DomainError {
  public readonly metadata: Metadata;

  public constructor({
    metadata,
    message = `{${metadata.prop}} must be a number`,
  }: ConstructorProps) {
    super({ message });

    this.metadata = metadata;

    Object.setPrototypeOf(this, NotNumberError.prototype);
  }
}

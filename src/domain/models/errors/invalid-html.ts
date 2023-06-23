import { DomainError } from '@domain/models/errors';

export class InvalidHTMLError extends DomainError {
  public readonly metadata: InvalidHTMLError.Metadata;

  constructor({
    metadata,
    message = `{${metadata.prop}} HTML is invalid`,
  }: InvalidHTMLError.ConstructorProps) {
    super({ message });

    this.metadata = metadata;

    Object.setPrototypeOf(this, InvalidHTMLError.prototype);
  }
}

export namespace InvalidHTMLError {
  export type Metadata = { prop: string; value: string };

  export type ConstructorProps = DomainError.ConstructorProps & {
    metadata: Metadata;
  };
}

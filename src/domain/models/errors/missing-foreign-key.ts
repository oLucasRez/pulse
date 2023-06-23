import { DomainError } from '@domain/models/errors';

export class MissingForeignKeyError extends DomainError {
  public readonly metadata: MissingForeignKeyError.Metadata;

  constructor({
    metadata,
    message = `{${metadata.prop}} foreign key is missing`,
  }: MissingForeignKeyError.ConstructorProps) {
    super({ message });

    this.metadata = metadata;

    Object.setPrototypeOf(this, MissingForeignKeyError.prototype);
  }
}

export namespace MissingForeignKeyError {
  export type Metadata = { prop: string; value: any };

  export type ConstructorProps = DomainError.ConstructorProps & {
    metadata: Metadata;
  };
}

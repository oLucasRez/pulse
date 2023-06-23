import { DomainError } from '@domain/models/errors';

export class OutOfBoundError extends DomainError {
  public readonly metadata: OutOfBoundError.Metadata;

  constructor({ metadata, message }: OutOfBoundError.ConstructorProps) {
    const { prop, bound, limit } = metadata;
    const unit = metadata.unit ? ' ' + metadata.unit : '';
    const defaultMessage = `{${prop}} is ${bound} ${limit}${unit}`;

    super({ message: message ?? defaultMessage });

    this.metadata = metadata;

    Object.setPrototypeOf(this, OutOfBoundError.prototype);
  }
}

export namespace OutOfBoundError {
  export type Metadata = {
    prop: string;
    value: any;
    bound: 'above' | 'below';
    limit: number;
    unit?: string;
  };

  export type ConstructorProps = DomainError.ConstructorProps & {
    metadata: Metadata;
  };
}

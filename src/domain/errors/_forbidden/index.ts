import { DomainError } from '..';

export class ForbiddenError extends DomainError<ForbiddenError.Metadata> {
  public constructor(
    message = 'Forbidden error',
    metadata: ForbiddenError.Metadata = {},
  ) {
    super(message, metadata);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export namespace ForbiddenError {
  export type Metadata = {
    prop?: string;
    value?: any;
  };
}

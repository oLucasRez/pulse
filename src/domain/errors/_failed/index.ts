import { DomainError } from '..';

export class FailedError extends DomainError {
  public constructor(message = 'Failed error') {
    super(message, {});

    Object.setPrototypeOf(this, FailedError.prototype);
  }
}

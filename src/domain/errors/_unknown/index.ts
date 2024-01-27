import { DomainError } from '..';

export class UnknownError extends DomainError {
  public constructor(message = 'Unknown error') {
    super(message);

    Object.setPrototypeOf(this, UnknownError.prototype);
  }
}

import { DomainError } from '../domain';

export class UnknownError extends DomainError {
  public constructor(message = 'Unknown error') {
    super(message, {});

    Object.setPrototypeOf(this, UnknownError.prototype);
  }
}

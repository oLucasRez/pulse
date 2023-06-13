import { DomainError } from '@domain/errors';

export class NotPositiveError extends DomainError {
  constructor(message: string = 'Number must be greater than zero') {
    super(message, DomainError.Code.NOT_POSITIVE);

    Object.setPrototypeOf(this, NotPositiveError.prototype);
  }
}

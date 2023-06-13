import { DomainError } from '@domain/errors';

export class NotIntegerError extends DomainError {
  constructor(message: string = 'Number must be integer') {
    super(message, DomainError.Code.NOT_INTEGER);

    Object.setPrototypeOf(this, NotIntegerError.prototype);
  }
}

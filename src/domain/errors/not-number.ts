import { DomainError } from '@domain/errors';

export class NotNumberError extends DomainError {
  constructor(message: string = 'Value must be a number') {
    super(message, DomainError.Code.NOT_NUMBER);

    Object.setPrototypeOf(this, NotNumberError.prototype);
  }
}

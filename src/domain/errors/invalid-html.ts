import { DomainError } from '@domain/errors';

export class InvalidHTMLError extends DomainError {
  constructor(message: string = 'HTML is invalid') {
    super(message, DomainError.Code.INVALID_HTML);

    Object.setPrototypeOf(this, InvalidHTMLError.prototype);
  }
}

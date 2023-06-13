import { DomainError } from '@domain/errors';

export class EmptyStringError extends DomainError {
  constructor(message: string = 'String is empty') {
    super(message, DomainError.Code.EMPTY_STRING);

    Object.setPrototypeOf(this, EmptyStringError.prototype);
  }
}

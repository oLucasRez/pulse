import { DomainError } from '@domain/errors';

export class OutOfBoundError extends DomainError {
  constructor(message: string = 'Value is out of bound') {
    super(message, DomainError.Code.OUT_OF_BOUND);

    Object.setPrototypeOf(this, OutOfBoundError.prototype);
  }
}

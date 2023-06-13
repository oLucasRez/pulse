import { DomainError } from '@domain/errors';

export class MissingForeignKeyError extends DomainError {
  constructor(message: string = 'Foreign key is missing') {
    super(message, DomainError.Code.MISSING_FOREIGN_KEY);

    Object.setPrototypeOf(this, MissingForeignKeyError.prototype);
  }
}

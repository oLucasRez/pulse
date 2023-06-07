import { ErrorCode } from '@common/domain/enums';
import { DomainError } from '@common/domain/errors';

export class NotIntegerError extends DomainError {
  constructor() {
    super('Number must be integer', ErrorCode.NOT_INTEGER);

    Object.setPrototypeOf(this, NotIntegerError.prototype);
  }
}

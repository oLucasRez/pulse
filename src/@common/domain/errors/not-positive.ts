import { ErrorCode } from '@common/domain/enums';
import { DomainError } from '@common/domain/errors';

export class NotPositiveError extends DomainError {
  constructor() {
    super('Number must be greater than zero', ErrorCode.NOT_POSITIVE);

    Object.setPrototypeOf(this, NotPositiveError.prototype);
  }
}

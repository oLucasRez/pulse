import { ErrorCode } from '@common/domain/enums';
import { DomainError } from '@common/domain/errors';

export class EmptyStringError extends DomainError {
  constructor() {
    super('String is empty', ErrorCode.EMPTY_STRING);

    Object.setPrototypeOf(this, EmptyStringError.prototype);
  }
}

import { ErrorCode } from '@common/domain/enums';

export class DomainError extends Error {
  constructor(
    message: string,
    public readonly code: ErrorCode = ErrorCode.UNEXPECTED,
  ) {
    super(message);

    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

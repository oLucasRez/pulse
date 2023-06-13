export class DomainError extends Error {
  constructor(
    message: string = 'Unexpected error',
    public readonly code: DomainError.Code = DomainError.Code.UNEXPECTED,
  ) {
    super(message);

    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export namespace DomainError {
  export enum Code {
    UNEXPECTED = 'unexpected',
    EMPTY_STRING = 'empty-string',
    MISSING_FOREIGN_KEY = 'missing-foreign-key',
    NOT_INTEGER = 'not-integer',
    NOT_POSITIVE = 'not-positive',
  }
}

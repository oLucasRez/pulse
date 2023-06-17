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
    INVALID_HTML = 'invalid-html',
    MISSING_FOREIGN_KEY = 'missing-foreign-key',
    NOT_INTEGER = 'not-integer',
    NOT_NUMBER = 'not-number',
    NOT_POSITIVE = 'not-positive',
    OUT_OF_BOUND = 'out-of-bound',
  }
}

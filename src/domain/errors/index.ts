export abstract class DomainError<M extends object = object> extends Error {
  protected constructor(
    message = 'Unexpected error',
    public readonly metadata: M,
  ) {
    super(message);

    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export * from './_failed';
export * from './_forbidden';
export * from './_not-found';
export * from './_not-integer';
export * from './_out-of-bound';
export * from './_unknown';

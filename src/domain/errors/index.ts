export class DomainError extends Error {
  public constructor(message = 'Unexpected error') {
    super(message);

    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export * from './_failed';
export * from './_unknown';

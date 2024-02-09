export abstract class DomainError<M extends object = object> extends Error {
  protected constructor(
    message = 'Unexpected error',
    public readonly metadata: M,
  ) {
    super(message);

    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

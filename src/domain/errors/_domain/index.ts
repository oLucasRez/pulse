export class DomainError extends Error {
  constructor({
    message = 'Unexpected error',
  }: DomainError.ConstructorProps = {}) {
    super(message);

    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

export namespace DomainError {
  export type ConstructorProps = { message?: string };
}

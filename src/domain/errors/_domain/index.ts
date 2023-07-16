type ConstructorProps = { message?: string };

export class DomainError extends Error {
  public constructor(props: ConstructorProps = {}) {
    const { message = 'Unexpected error' } = props;

    super(message);

    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

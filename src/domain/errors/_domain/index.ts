type NewProps = { message?: string };

export class DomainError extends Error {
  public constructor(props: NewProps = {}) {
    const { message = 'Unexpected error' } = props;

    super(message);

    Object.setPrototypeOf(this, DomainError.prototype);
  }
}

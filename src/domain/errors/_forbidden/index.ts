import { DomainError } from '..';

export class ForbiddenError extends DomainError<ForbiddenError.Metadata> {
  public constructor(props: ForbiddenError.Props) {
    const { message, metadata = {} } = props;

    const defaultMessage = [
      'Not allowed',
      metadata.tried && 'to',
      metadata.tried,
    ]
      .filter((_) => _)
      .join(' ');

    super(message || defaultMessage, metadata);

    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export namespace ForbiddenError {
  export type Metadata = {
    prop?: string;
    value?: any;
    tried?: string;
  };

  export type Props = {
    message?: string;
    metadata?: Metadata;
  };
}

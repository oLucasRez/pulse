import { DomainError } from '../domain';

export class InvalidDataError extends DomainError<InvalidDataError.Metadata> {
  public constructor(props: InvalidDataError.Props) {
    const { metadata = {}, message } = props;

    let defaultMessage = '';

    const { prop, value } = metadata;

    if (prop) {
      defaultMessage = `${prop} ${value} is invalid`;
    } else defaultMessage = 'Invalid data';

    super(message ?? defaultMessage, metadata);

    Object.setPrototypeOf(this, InvalidDataError.prototype);
  }
}

export namespace InvalidDataError {
  export type Metadata = {
    prop?: string;
    value?: any;
  };

  export type Props = {
    message?: string;
    metadata?: InvalidDataError.Metadata;
  };
}

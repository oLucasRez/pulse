import { DomainError } from '..';

export class NotIntegerError extends DomainError<NotIntegerError.Metadata> {
  public constructor(props: NotIntegerError.Props) {
    const { metadata, message } = props;

    const { value } = metadata;
    const defaultMessage = `${value} is not integer`;

    super(message ?? defaultMessage, metadata);

    Object.setPrototypeOf(this, NotIntegerError.prototype);
  }
}

export namespace NotIntegerError {
  export type Metadata = {
    prop: string;
    value: any;
  };

  export type Props = {
    message?: string;
    metadata: NotIntegerError.Metadata;
  };
}

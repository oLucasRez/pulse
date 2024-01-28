import { isNonNullable } from '@domain/utils';

import { DomainError } from '..';

export class FailedError extends DomainError {
  public constructor(props: FailedError.Props) {
    const { message, metadata = {} } = props;

    const defaultMessage = ['Failed', metadata.tried && 'to', metadata.tried]
      .filter(isNonNullable)
      .join(' ');

    super(message || defaultMessage, metadata);

    Object.setPrototypeOf(this, FailedError.prototype);
  }
}

export namespace FailedError {
  export type Metadata = {
    tried?: string;
  };

  export type Props = {
    message?: string;
    metadata?: Metadata;
  };
}

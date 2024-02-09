import { isNonNullable } from '@domain/utils';

import { DomainError } from '../domain';

export class NotFoundError extends DomainError<NotFoundError.Metadata> {
  public constructor(props: NotFoundError.Props) {
    const { message, metadata } = props;

    const { entity, prop, value } = metadata;
    const defaultMessage = [
      entity,
      prop ? 'with ' + prop : null,
      value,
      'not found',
    ]
      .filter(isNonNullable)
      .join(' ');

    super(message || defaultMessage, metadata);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export namespace NotFoundError {
  export type Metadata = {
    entity: string;
    prop?: string;
    value?: any;
  };

  export type Props = {
    message?: string;
    metadata: Metadata;
  };
}

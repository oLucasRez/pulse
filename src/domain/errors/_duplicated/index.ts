import { DomainError } from '../domain';

export class DuplicatedError extends DomainError<DuplicatedError.Metadata> {
  public constructor(props: DuplicatedError.Props) {
    const { message, metadata = {} } = props;

    const { entity } = metadata;
    const defaultMessage = `${entity || 'Entity'} already exists`;

    super(message || defaultMessage, metadata);

    Object.setPrototypeOf(this, DuplicatedError.prototype);
  }
}

export namespace DuplicatedError {
  export type Metadata = {
    entity?: string;
  };

  export type Props = {
    message?: string;
    metadata?: Metadata;
  };
}

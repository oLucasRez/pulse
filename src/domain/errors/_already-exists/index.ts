import { DomainError } from '../domain';

export class AlreadyExistsError extends DomainError<AlreadyExistsError.Metadata> {
  public constructor(props: AlreadyExistsError.Props) {
    const { message, metadata = {} } = props;

    const { entity } = metadata;
    const defaultMessage = `${entity || 'Entity'} already exists`;

    super(message || defaultMessage, metadata);

    Object.setPrototypeOf(this, AlreadyExistsError.prototype);
  }
}

export namespace AlreadyExistsError {
  export type Metadata = {
    entity?: string;
  };

  export type Props = {
    message?: string;
    metadata?: Metadata;
  };
}

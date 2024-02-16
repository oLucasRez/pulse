import { DomainError } from '../domain';

export class RequiredError extends DomainError<RequiredError.Metadata> {
  public constructor(props: RequiredError.Props) {
    const { message, metadata = {} } = props;

    const { entity } = metadata;
    const defaultMessage = `${entity || 'Entity'} is required`;

    super(message || defaultMessage, metadata);

    Object.setPrototypeOf(this, RequiredError.prototype);
  }
}

export namespace RequiredError {
  export type Metadata = {
    entity?: string;
  };

  export type Props = {
    message?: string;
    metadata?: Metadata;
  };
}

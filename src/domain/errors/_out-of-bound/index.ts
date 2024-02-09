import { DomainError } from '../domain';

export class OutOfBoundError extends DomainError<OutOfBoundError.Metadata> {
  public constructor(props: OutOfBoundError.Props) {
    const { metadata, message } = props;

    const { prop, bound, limit } = metadata;
    const unit = metadata.unit ? ' ' + metadata.unit : '';
    const defaultMessage = `${prop} is ${bound} ${limit}${unit}`;

    super(message ?? defaultMessage, metadata);

    Object.setPrototypeOf(this, OutOfBoundError.prototype);
  }
}

export namespace OutOfBoundError {
  export type Metadata = {
    prop: string;
    value: any;
    bound: 'above' | 'below';
    limit: number;
    unit?: string;
  };

  export type Props = {
    message?: string;
    metadata: Metadata;
  };
}

import {
  DomainError,
  EmptyStringError,
  NotIntegerError,
  NotPositiveError,
} from '@common/domain/errors';
import { Result } from '@meta/domain/models';

import { uuid } from '@meta/utils';

export class CentralPulse {
  public static create(
    props: CentralPulse.CreateProps,
  ): Result<CentralPulse, CentralPulse.Errors> {
    const { id = uuid(), amount, centralFactID } = props;

    if (centralFactID === '') return Result.reject(new EmptyStringError());

    if (amount <= 0) return Result.reject(new NotPositiveError());
    if (amount % 1 !== 0) return Result.reject(new NotIntegerError());

    return Result.resolve(new CentralPulse({ id, amount, centralFactID }));
  }

  private constructor(props: CentralPulse.Props) {
    this.id = props.id;
    this.amount = props.amount;
    this.centralFactID = props.centralFactID;
  }

  public readonly id: string;
  public readonly amount: number;
  public readonly centralFactID: string;
}

export namespace CentralPulse {
  export type Errors = DomainError;

  export type CreateProps = {
    id?: string;
    amount: number;
    centralFactID: string;
  };

  export type Props = {
    id: string;
    amount: number;
    centralFactID: string;
  };
}

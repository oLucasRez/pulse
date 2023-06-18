import { Result } from '@domain/models';

import {
  MissingForeignKeyError,
  NotIntegerError,
  NotPositiveError,
} from '@domain/errors';

import { isGreaterThanOrEqualTo, isInteger, uuid } from '@utils';

import { ID } from '@types';

/**
 * Is the main pulse, localized in the origin (0,0), and where the central fact
 * is.
 *
 * @properties
 * - `id`: Instance ID
 * - `gap`: The distance between pulses (value = 1)
 * - `amount`: The amount of pulses
 * - `gameID`: The game of the Central Pulse
 */
export class CentralPulse {
  public static create(
    props: CentralPulse.CreateProps,
  ): Result<CentralPulse, CentralPulse.Errors> {
    const { id = uuid(), amount, gameID } = props;

    if (!isGreaterThanOrEqualTo(amount, 0))
      return Result.reject(
        new NotPositiveError('Amount must be greater than or equal to zero'),
      );
    if (!isInteger(amount))
      return Result.reject(new NotIntegerError('Amount must be integer'));

    if (!gameID)
      return Result.reject(
        new MissingForeignKeyError('Game ID foreign key is missing'),
      );

    return Result.resolve(new CentralPulse({ id, gap: 1, amount, gameID }));
  }

  public update(
    props: CentralPulse.UpdateProps,
  ): Result<CentralPulse, CentralPulse.Errors> {
    if ('amount' in props) {
      if (!isGreaterThanOrEqualTo(props.amount, 0))
        return Result.reject(
          new NotPositiveError('Amount must be greater than or equal to zero'),
        );
      if (!isInteger(props.amount))
        return Result.reject(new NotIntegerError('Amount must be integer'));

      this._amount = props.amount;
    }

    return Result.resolve(this);
  }

  private constructor(props: CentralPulse.Props) {
    this.id = props.id;
    this.gap = props.gap;
    this._amount = props.amount;
    this.gameID = props.gameID;
  }

  public readonly id: ID;

  public readonly gap: number;

  private _amount: number;
  public get amount() {
    return this._amount;
  }

  public readonly gameID: ID;
}

export namespace CentralPulse {
  export type Errors =
    | NotPositiveError
    | NotIntegerError
    | MissingForeignKeyError;

  export type CreateProps = {
    id?: ID;
    amount: number;
    gameID: ID;
  };

  export type UpdateProps = {
    amount?: number;
  };

  export type Props = {
    id: ID;
    gap: number;
    amount: number;
    gameID: ID;
  };
}

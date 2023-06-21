import { Result } from '@domain/models';

import {
  MissingForeignKeyError,
  NotIntegerError,
  NotPositiveError,
} from '@domain/errors';

import { isGreaterThanOrEqualTo, isInteger, nowISO, uuid } from '@utils';

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
 * - `createdAt`: When was it created
 * - `updatedAt`: When was the last update
 */
export class CentralPulse {
  public static create(
    props: CentralPulse.CreateProps,
  ): Result<CentralPulse, CentralPulse.CreateErrors> {
    const {
      id = uuid(),
      amount,
      gameID,
      createdAt = nowISO(),
      updatedAt = createdAt,
    } = props;

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

    return Result.resolve(
      new CentralPulse({ id, gap: 1, amount, gameID, createdAt, updatedAt }),
    );
  }

  public update(
    props: CentralPulse.UpdateProps,
  ): Result<CentralPulse, CentralPulse.UpdateErrors> {
    const { amount, updatedAt = nowISO() } = props;

    if ('amount' in props) {
      if (!isGreaterThanOrEqualTo(amount, 0))
        return Result.reject(
          new NotPositiveError('Amount must be greater than or equal to zero'),
        );
      if (!isInteger(amount))
        return Result.reject(new NotIntegerError('Amount must be integer'));

      this._amount = amount;
      this._updatedAt = updatedAt;
    }

    return Result.resolve(this);
  }

  private constructor(props: CentralPulse.Props) {
    this._id = props.id;

    this._gap = props.gap;
    this._amount = props.amount;
    this._gameID = props.gameID;

    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private _id: ID;
  public get id() {
    return this._id;
  }

  private _gap: number;
  public get gap() {
    return this._gap;
  }

  private _amount: number;
  public get amount() {
    return this._amount;
  }

  private _gameID: ID;
  public get gameID() {
    return this._gameID;
  }

  private _createdAt: string;
  public get createdAt() {
    return this._createdAt;
  }

  private _updatedAt: string;
  public get updatedAt() {
    return this._updatedAt;
  }
}

export namespace CentralPulse {
  export type CreateErrors =
    | NotPositiveError
    | NotIntegerError
    | MissingForeignKeyError;

  export type CreateProps = {
    id?: ID;

    amount: number;
    gameID: ID;

    createdAt?: string;
    updatedAt?: string;
  };

  export type UpdateErrors = NotPositiveError | NotIntegerError;

  export type UpdateProps = {
    amount?: number;

    updatedAt?: string;
  };

  export type Props = {
    id: ID;

    gap: number;
    amount: number;
    gameID: ID;

    createdAt: string;
    updatedAt: string;
  };
}

import { Result, Vector } from '@domain/models';

import {
  MissingForeignKeyError,
  NotIntegerError,
  NotPositiveError,
  OutOfBoundError,
} from '@domain/errors';

import {
  isGreaterThan,
  isGreaterThanOrEqualTo,
  isInteger,
  isLowerThanOrEqualTo,
  nowISO,
  uuid,
} from '@utils';

import { ID } from '@types';

/**
 * It's a custom dice that each player needs to have.
 *
 * @properties
 * - `id`: Instance ID
 * - `sides`: The number of sides of the dice
 * - `value`: The current value of the dice
 * - `position`: The current position on the map
 * - `playerID`: The player owner of the dice
 * - `createdAt`: When was it created
 * - `updatedAt`: When was the last update
 */
export class Dice {
  public static create(
    props: Dice.CreateProps,
  ): Result<Dice, Dice.CreateErrors> {
    const {
      id = uuid(),
      sides,
      value = null,
      position,
      playerID,
      createdAt = nowISO(),
      updatedAt = createdAt,
    } = props;

    if (!isGreaterThan(sides, 0))
      return Result.reject(
        new NotPositiveError('Sides must be greater than zero'),
      );
    if (!isInteger(sides))
      return Result.reject(new NotIntegerError('Sides must be integer'));

    if (value !== null) {
      if (!isInteger(value))
        return Result.reject(new NotIntegerError('Value must be integer'));

      if (!isGreaterThanOrEqualTo(value, 1))
        return Result.reject(
          new OutOfBoundError('Value must be greater than or equal to 1'),
        );

      if (!isLowerThanOrEqualTo(value, sides))
        return Result.reject(
          new OutOfBoundError('Value must be lower than or equal to Sides'),
        );
    }

    if (!playerID)
      return Result.reject(
        new MissingForeignKeyError('Player ID foreign key is missing'),
      );

    return Result.resolve(
      new Dice({ id, sides, value, position, playerID, createdAt, updatedAt }),
    );
  }

  public update(props: Dice.UpdateProps): Result<Dice, Dice.UpdateErrors> {
    const { value, updatedAt = nowISO() } = props;

    if ('value' in props) {
      if (value !== null) {
        if (!isInteger(value))
          return Result.reject(new NotIntegerError('Value must be integer'));

        if (!isGreaterThanOrEqualTo(value, 1))
          return Result.reject(
            new OutOfBoundError('Value must be greater than or equal to 1'),
          );

        if (!isLowerThanOrEqualTo(value, this.sides))
          return Result.reject(
            new OutOfBoundError('Value must be lower than or equal to Sides'),
          );
      }

      this._value = value;
      this._updatedAt = updatedAt;
    }

    return Result.resolve(this);
  }

  private constructor(props: Dice.Props) {
    this._id = props.id;

    this._sides = props.sides;
    this._value = props.value;
    this._position = props.position;
    this._playerID = props.playerID;

    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private _id: ID;
  public get id() {
    return this._id;
  }

  private _sides: number;
  public get sides() {
    return this._sides;
  }

  private _value: number | null;
  public get value() {
    return this._value;
  }

  private _position: Vector;
  public get position() {
    return this._position;
  }

  private _playerID: ID;
  public get playerID() {
    return this._playerID;
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

export namespace Dice {
  export type CreateErrors =
    | NotPositiveError
    | NotIntegerError
    | OutOfBoundError
    | MissingForeignKeyError;

  export type CreateProps = {
    id?: ID;

    sides: number;
    value?: number;
    position: Vector;
    playerID: ID;

    createdAt?: string;
    updatedAt?: string;
  };

  export type UpdateErrors = NotIntegerError | OutOfBoundError;

  export type UpdateProps = {
    value?: number | null;

    updatedAt?: string;
  };

  export type Props = {
    id: ID;

    sides: number;
    value: number | null;
    position: Vector;
    playerID: ID;

    createdAt: string;
    updatedAt: string;
  };
}

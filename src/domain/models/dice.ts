import { Result, Vector } from '@domain/models';

import {
  NotIntegerError,
  NotPositiveError,
  OutOfBoundError,
} from '@domain/errors';

import {
  isGreaterThan,
  isGreaterThanOrEqualTo,
  isInteger,
  isLowerThanOrEqualTo,
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
 */
export class Dice {
  public static create(props: Dice.CreateProps): Result<Dice, Dice.Errors> {
    const { id = uuid(), sides, value = null, playerID } = props;

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

    const position = Vector.create(props.position).await();

    return Result.resolve(new Dice({ id, sides, value, position, playerID }));
  }

  public update(props: Dice.UpdateProps): Result<Dice, Dice.Errors> {
    const { value, position } = props;

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
    }

    if ('position' in props) {
      this._position.update(position).await();
    }

    return Result.resolve(this);
  }

  private constructor(props: Dice.Props) {
    this.id = props.id;
    this.sides = props.sides;
    this._value = props.value;
    this._position = props.position;
    this.playerID = props.playerID;
  }

  public readonly id: ID;

  public readonly sides: number;

  private _value: number | null;
  public get value() {
    return this._value;
  }

  private _position: Vector;
  public get position() {
    return this._position;
  }

  public readonly playerID: ID;
}

export namespace Dice {
  export type Errors =
    | NotPositiveError
    | NotIntegerError
    | OutOfBoundError
    | Vector.Errors;

  export type CreateProps = {
    id?: ID;
    sides: number;
    value?: number;
    position: Vector.CreateProps;
    playerID: ID;
  };

  export type UpdateProps = {
    value?: number | null;
    position?: Vector.UpdateProps;
  };

  export type Props = {
    id: ID;
    sides: number;
    value: number | null;
    position: Vector;
    playerID: ID;
  };
}

import { Result } from '@domain/models';

import { MissingForeignKeyError, NotIntegerError } from '@domain/errors';

import { isInteger, uuid } from '@utils';

import { ID } from '@types';

/**
 * todo...
 *
 * @properties
 * - `id`: Instance ID
 */
export class Overload {
  public static create(
    props: Overload.CreateProps,
  ): Result<Overload, Overload.Errors> {
    const { id = uuid(), history, overloaded, diceID } = props;

    for (let i = 0; i < history.length; i++) {
      if (!isInteger(history[i]))
        return Result.reject(
          new NotIntegerError(`History[${i}] must be integer`),
        );
    }

    if (!diceID)
      return Result.reject(
        new MissingForeignKeyError('Dice ID foreign key is missing'),
      );

    return Result.resolve(new Overload({ id, history, overloaded, diceID }));
  }

  public update(
    props: Overload.UpdateProps,
  ): Result<Overload, Overload.Errors> {
    const { history, overloaded } = props;

    if ('history' in props) {
      for (let i = 0; i < history.length; i++) {
        if (!isInteger(history[i]))
          return Result.reject(
            new NotIntegerError(`History[${i}] must be integer`),
          );
      }

      this._history = history;
    }

    if ('overloaded' in props) this._overloaded = overloaded;

    return Result.resolve(this);
  }

  private constructor(props: Overload.Props) {
    this.id = props.id;
    this._history = props.history;
    this._overloaded = props.overloaded;
    this.diceID = props.diceID;
  }

  public readonly id: ID;

  private _history: number[];
  public get history() {
    return this._history;
  }

  private _overloaded: boolean;
  public get overloaded() {
    return this._overloaded;
  }

  public readonly diceID: ID;
}

export namespace Overload {
  export type Errors = NotIntegerError | MissingForeignKeyError;

  export type CreateProps = {
    id?: ID;
    history: number[];
    overloaded: boolean;
    diceID: ID;
  };

  export type UpdateProps = {
    history?: number[];
    overloaded?: boolean;
  };

  export type Props = {
    id: ID;
    history: number[];
    overloaded: boolean;
    diceID: ID;
  };
}

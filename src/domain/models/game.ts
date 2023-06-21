import { Result } from '@domain/models';

import { DomainError, MissingForeignKeyError } from '@domain/errors';

import { nowISO, uuid } from '@utils';

import { ID } from '@types';

/**
 * Is the root instance of a new Pulse game.
 *
 * @properties
 * - `id`: Instance ID
 * - `state`: The current state of the game
 * - `userID`: The host user, who created the game
 * - `createdAt`: When was it created
 * - `updatedAt`: When was the last update
 */
export class Game {
  public static create(
    props: Game.CreateProps,
  ): Result<Game, Game.CreateErrors> {
    const {
      id = uuid(),
      state = Game.State.START,
      userID,
      createdAt = nowISO(),
      updatedAt = createdAt,
    } = props;

    if (!userID)
      return Result.reject(
        new MissingForeignKeyError('User ID foreign key is missing'),
      );

    return Result.resolve(
      new Game({ id, state, userID, createdAt, updatedAt }),
    );
  }

  public update(props: Game.UpdateProps): Result<Game, Game.UpdateErrors> {
    const { state, updatedAt = nowISO() } = props;

    if ('state' in props) {
      this._state = state;
      this._updatedAt = updatedAt;
    }

    return Result.resolve(this);
  }

  private constructor(props: Game.Props) {
    this._id = props.id;

    this._state = props.state;
    this._userID = props.userID;

    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private _id: ID;
  public get id() {
    return this._id;
  }

  private _state: Game.State;
  get state() {
    return this._state;
  }

  private _userID: ID;
  public get userID() {
    return this._userID;
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

export namespace Game {
  export type CreateErrors = MissingForeignKeyError;

  export type CreateProps = {
    id?: ID;

    state?: State;
    userID: ID;

    createdAt?: string;
    updatedAt?: string;
  };

  export type UpdateErrors = DomainError;

  export type UpdateProps = {
    state?: State;

    updatedAt?: string;
  };

  export type Props = {
    id: ID;

    state: State;
    userID: ID;

    createdAt: string;
    updatedAt: string;
  };

  export enum State {
    START = 'start',
    SUBJECT_CREATION = 'subject-creation',
    CENTRAL_FACT_CREATION = 'central-fact-creation',
    QUESTIONING = 'questioning',
    ANSWERING = 'answering',
    LIGHT_SPOT_CREATION = 'light-spot-creation',
    CHECK_OVERLOAD = 'check-overload',
    SUMMARY = 'summary',
    END = 'end',
  }
}

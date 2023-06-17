import { Result } from '@domain/models';

import { MissingForeignKeyError } from '@domain/errors';

import { uuid } from '@utils';

import { ID } from '@types';

/**
 * Is the root instance of a new Pulse game.
 *
 * @properties
 * - `id`: Instance ID
 * - `state`: The current state of the game
 * - `userID`: The host user, who created the game
 */
export class Game {
  public static create(props: Game.CreateProps): Result<Game, Game.Errors> {
    const { id = uuid(), state = Game.State.START, userID } = props;

    if (!userID)
      return Result.reject(
        new MissingForeignKeyError('User ID foreign key is missing'),
      );

    return Result.resolve(new Game({ id, state, userID }));
  }

  public update(props: Game.UpdateProps): Result<Game, Game.Errors> {
    const { state } = props;

    if ('state' in props) this._state = state;

    return Result.resolve(this);
  }

  private constructor(props: Game.Props) {
    this.id = props.id;
    this._state = props.state;
    this.userID = props.userID;
  }

  public readonly id: ID;

  private _state: Game.State;
  get state() {
    return this._state;
  }

  public readonly userID: ID;
}

export namespace Game {
  export type Errors = MissingForeignKeyError;

  export type CreateProps = {
    id?: ID;
    state?: State;
    userID: ID;
  };

  export type UpdateProps = {
    state?: State;
  };

  export type Props = {
    id: ID;
    state: State;
    userID: ID;
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

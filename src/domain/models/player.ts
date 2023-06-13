import { Result } from '@domain/models';

import { Color } from '@domain/enums';

import { EmptyStringError, MissingForeignKeyError } from '@domain/errors';

import { uuid } from '@utils';

import { ID } from '@types';

/**
 * It's an account authenticated on the platform.
 *
 * @properties
 * - `id`: Instance ID
 * - `name`: The name of the player
 * - `color`: The color of the player
 * - `gameID`: The game the player is playing
 * - `userID`: The user playing
 */
export class Player {
  public static create(
    props: Player.CreateProps,
  ): Result<Player, Player.Errors> {
    const { id = uuid(), name, color, gameID, userID = null } = props;

    if (!name) return Result.reject(new EmptyStringError('Name is empty'));

    if (!gameID)
      return Result.reject(
        new MissingForeignKeyError('Game ID foreign key is missing'),
      );

    return Result.resolve(new Player({ id, name, color, gameID, userID }));
  }

  private constructor(props: Player.Props) {
    this.id = props.id;
    this.name = props.name;
    this.color = props.color;
    this.gameID = props.gameID;
    this.userID = props.userID;
  }

  public readonly id: ID;
  public readonly name: string;
  public readonly color: Color;
  public readonly gameID: ID;
  public readonly userID: ID | null;
}

export namespace Player {
  export type Errors = EmptyStringError;

  export type CreateProps = {
    id?: ID;
    name: string;
    color: Color;
    gameID: ID;
    userID?: ID;
  };

  export type Props = {
    id: ID;
    name: string;
    color: Color;
    gameID: ID;
    userID: ID | null;
  };
}

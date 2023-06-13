import { Result } from '@domain/models';

import { Color } from '@domain/enums';

import { EmptyStringError, MissingForeignKeyError } from '@domain/errors';

import { uuid } from '@utils';

import { ID } from '@types';

/**
 * Subjects are the different components in a story, including characters,
 * places, and objects. In the game context, a Subject refers to the main
 * creation of each player and the secondary Light Spot. It is organized on the
 * Pulse Map and identified by color. A Subject can be any physical entity seen
 * in a movie scene, like a person, place, or object. Players' Subjects can be
 * unrelated and from different time periods. The reasons for their diversity
 * will be revealed during the game.
 *
 * @properties
 * - `id`: Instance ID
 * - `description`: A name that describes the subject
 * - `color`: The color that represents the subject
 * - `playerID`: The player who declared the subject
 */
export class Subject {
  public static create(
    props: Subject.CreateProps,
  ): Result<Subject, Subject.Errors> {
    const { id = uuid(), description, color, playerID } = props;

    if (!description)
      return Result.reject(new EmptyStringError('Description is empty'));

    if (!playerID)
      return Result.reject(
        new MissingForeignKeyError('Player ID foreign key is missing'),
      );

    return Result.resolve(new Subject({ id, description, color, playerID }));
  }

  private constructor(props: Subject.Props) {
    this.id = props.id;
    this.description = props.description;
    this.color = props.color;
    this.playerID = props.playerID;
  }

  public readonly id: ID;
  public readonly description: string;
  public readonly color: Color;
  public readonly playerID: ID;
}

export namespace Subject {
  export type Errors = EmptyStringError;

  export type CreateProps = {
    id?: ID;
    description: string;
    color: Color;
    playerID: ID;
  };

  export type Props = {
    id: ID;
    description: string;
    color: Color;
    playerID: ID;
  };
}

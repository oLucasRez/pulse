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

  public update(props: Subject.UpdateProps): Result<Subject, Subject.Errors> {
    const { description, color } = props;

    if ('description' in props) {
      if (!description)
        return Result.reject(new EmptyStringError('Description is empty'));

      this._description = description;
    }

    if ('color' in props) this._color = color;

    return Result.resolve(this);
  }

  private constructor(props: Subject.Props) {
    this.id = props.id;
    this._description = props.description;
    this._color = props.color;
    this.playerID = props.playerID;
  }

  public readonly id: ID;

  private _description: string;
  public get description() {
    return this._description;
  }

  private _color: Color;
  public get color() {
    return this._color;
  }

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

  export type UpdateProps = {
    description?: string;
    color?: Color;
  };

  export type Props = {
    id: ID;
    description: string;
    color: Color;
    playerID: ID;
  };
}

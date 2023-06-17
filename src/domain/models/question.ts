import { Result } from '@domain/models';

import { InvalidHTMLError, MissingForeignKeyError } from '@domain/errors';

import { isHTMLValid, uuid } from '@utils';

import { ID } from '@types';

/**
 * ...
 *
 * @properties
 * - `id`: Instance ID
 */
export class Question {
  public static create(
    props: Question.CreateProps,
  ): Result<Question, Question.Errors> {
    const { id = uuid(), landmarkID, html } = props;

    if (!isHTMLValid(html)) return Result.reject(new InvalidHTMLError());

    if (!landmarkID)
      return Result.reject(
        new MissingForeignKeyError('Landmark ID foreign key is missing'),
      );

    return Result.resolve(new Question({ id, html, landmarkID }));
  }

  public update(
    props: Question.UpdateProps,
  ): Result<Question, Question.Errors> {
    const { html } = props;

    if ('html' in props) {
      if (!isHTMLValid(html)) return Result.reject(new InvalidHTMLError());

      this._html = html;
    }

    return Result.resolve(this);
  }

  private constructor(props: Question.Props) {
    this.id = props.id;
    this._html = props.html;
    this.landmarkID = props.landmarkID;
  }

  public readonly id: ID;

  private _html: string;
  public get html() {
    return this._html;
  }

  public readonly landmarkID: ID;
}

export namespace Question {
  export type Errors = InvalidHTMLError | MissingForeignKeyError;

  export type CreateProps = {
    id?: ID;
    html: string;
    landmarkID: ID;
  };

  export type UpdateProps = {
    html?: string;
  };

  export type Props = {
    id: ID;
    html: string;
    landmarkID: ID;
  };
}

import { Result } from '@domain/models';

import { InvalidHTMLError, MissingForeignKeyError } from '@domain/errors';

import { isHTMLValid, uuid } from '@utils';

import { ID } from '@types';

/**
 * It's a hypothesis a player can write to answer some open question. If
 * `isFact = true`, the answer becomes a fact.
 *
 * @properties
 * - `id`: Instance ID
 * - `html`: The content of the Answer
 * - `isFact`: A flag to indicate if the answer is a fact
 * - `questionID`: The question the answer is answering
 */
export class Answer {
  public static create(
    props: Answer.CreateProps,
  ): Result<Answer, Answer.Errors> {
    const { id = uuid(), html, isFact = false, questionID } = props;

    if (!isHTMLValid(html)) return Result.reject(new InvalidHTMLError());

    if (!questionID)
      return Result.reject(
        new MissingForeignKeyError('Question ID foreign key is missing'),
      );

    return Result.resolve(new Answer({ id, html, isFact, questionID }));
  }

  public update(props: Answer.UpdateProps): Result<Answer, Answer.Errors> {
    if ('html' in props) {
      if (!isHTMLValid(props.html))
        return Result.reject(new InvalidHTMLError());

      this._html = props.html;
    }

    if ('isFact' in props) this._isFact = props.isFact;

    return Result.resolve(this);
  }

  private constructor(props: Answer.Props) {
    this.id = props.id;
    this._html = props.html;
    this._isFact = props.isFact;
    this.questionID = props.questionID;
  }

  public readonly id: ID;

  private _html: string;
  public get html() {
    return this._html;
  }

  private _isFact: boolean;
  public get isFact() {
    return this._isFact;
  }

  public readonly questionID: ID;
}

export namespace Answer {
  export type Errors = InvalidHTMLError | MissingForeignKeyError;

  export type CreateProps = {
    id?: ID;
    html: string;
    isFact?: boolean;
    questionID: ID;
  };

  export type UpdateProps = {
    html?: string;
    isFact?: boolean;
  };

  export type Props = {
    id: ID;
    html: string;
    isFact: boolean;
    questionID: ID;
  };
}

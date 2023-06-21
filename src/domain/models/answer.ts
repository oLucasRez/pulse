import { Result } from '@domain/models';

import { MissingForeignKeyError } from '@domain/errors';

import { nowISO, uuid } from '@utils';

import { ID } from '@types';

/**
 * It's a hypothesis a player can write to answer some open question. If
 * `isFact = true`, the answer becomes a fact.
 *
 * @properties
 * - `id`: Instance ID
 * - `isFact`: A flag to indicate if the answer is a fact
 * - `richTextID`: The text that describes the Answer
 * - `questionID`: The question the answer is answering
 * - `createdAt`: When was it created
 * - `updatedAt`: When was the last update
 */
export class Answer {
  public static create(
    props: Answer.CreateProps,
  ): Result<Answer, Answer.CreateErrors> {
    const {
      id = uuid(),
      isFact = false,
      richTextID,
      questionID,
      createdAt = nowISO(),
      updatedAt = createdAt,
    } = props;

    if (!richTextID)
      return Result.reject(
        new MissingForeignKeyError('Rich Text ID foreign key is missing'),
      );

    if (!questionID)
      return Result.reject(
        new MissingForeignKeyError('Question ID foreign key is missing'),
      );

    return Result.resolve(
      new Answer({ id, isFact, richTextID, questionID, createdAt, updatedAt }),
    );
  }

  public update(
    props: Answer.UpdateProps,
  ): Result<Answer, Answer.UpdateErrors> {
    const { isFact, updatedAt = nowISO() } = props;

    if ('isFact' in props) {
      this._isFact = isFact;
      this._updatedAt = updatedAt;
    }

    return Result.resolve(this);
  }

  private constructor(props: Answer.Props) {
    this._id = props.id;

    this._isFact = props.isFact;
    this._richTextID = props.richTextID;
    this._questionID = props.questionID;

    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  private _id: ID;
  public get id() {
    return this._id;
  }

  private _isFact: boolean;
  public get isFact() {
    return this._isFact;
  }

  private _richTextID: ID;
  public get richTextID() {
    return this._richTextID;
  }

  private _questionID: ID;
  public get questionID() {
    return this._questionID;
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

export namespace Answer {
  export type CreateErrors = MissingForeignKeyError;

  export type CreateProps = {
    id?: ID;

    isFact?: boolean;
    richTextID: ID;
    questionID: ID;

    createdAt?: string;
    updatedAt?: string;
  };

  export type UpdateErrors = null;

  export type UpdateProps = {
    isFact?: boolean;

    updatedAt?: string;
  };

  export type Props = {
    id: ID;

    isFact: boolean;
    richTextID: ID;
    questionID: ID;

    createdAt: string;
    updatedAt: string;
  };
}

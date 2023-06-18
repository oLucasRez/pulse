import { Result } from '@domain/models';

import { MissingForeignKeyError } from '@domain/errors';

import { uuid } from '@utils';

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
 */
export class Answer {
  public static create(
    props: Answer.CreateProps,
  ): Result<Answer, Answer.Errors> {
    const { id = uuid(), isFact = false, richTextID, questionID } = props;

    if (!richTextID)
      return Result.reject(
        new MissingForeignKeyError('Rich Text ID foreign key is missing'),
      );

    if (!questionID)
      return Result.reject(
        new MissingForeignKeyError('Question ID foreign key is missing'),
      );

    return Result.resolve(new Answer({ id, isFact, richTextID, questionID }));
  }

  public update(props: Answer.UpdateProps): Result<Answer, Answer.Errors> {
    if ('isFact' in props) this._isFact = props.isFact;

    return Result.resolve(this);
  }

  private constructor(props: Answer.Props) {
    this.id = props.id;
    this._isFact = props.isFact;
    this.richTextID = props.richTextID;
    this.questionID = props.questionID;
  }

  public readonly id: ID;

  private _isFact: boolean;
  public get isFact() {
    return this._isFact;
  }

  public readonly richTextID: ID;

  public readonly questionID: ID;
}

export namespace Answer {
  export type Errors = MissingForeignKeyError;

  export type CreateProps = {
    id?: ID;
    isFact?: boolean;
    richTextID: ID;
    questionID: ID;
  };

  export type UpdateProps = {
    isFact?: boolean;
  };

  export type Props = {
    id: ID;
    isFact: boolean;
    richTextID: ID;
    questionID: ID;
  };
}

import { Color } from '@domain/enums';

import { Model, PlayerModel, QuestionModel } from '..';

export interface AnswerModel extends Model {
  description: string;
  color: Color;
  state: AnswerModel.State;
  questionID: QuestionModel['id'];
  authorID: PlayerModel['id'];
  votes: Record<string, boolean>;
}

export namespace AnswerModel {
  export type State = 'voting' | 'conjecture' | 'fact';

  export interface DTO extends Model.DTO {
    description: string;
    questionID: string;
    authorID: string;
    votes: Record<string, boolean>;
  }
}

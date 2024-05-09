import { Color } from '@domain/enums';

import { Model, PlayerModel, QuestionModel } from '..';

export interface AnswerModel extends Model {
  description: string;
  color: Color;
  questionID: QuestionModel['id'];
  authorID: PlayerModel['id'];
  authorName: string;
}

export namespace AnswerModel {
  export interface DTO extends Model.DTO {
    description: string;
    questionID: string;
    authorID: string;
  }
}

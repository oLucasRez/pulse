import { Model, PlayerModel, QuestionModel } from '..';

export interface AnswerModel extends Model {
  description: string;
  questionID: QuestionModel['id'];
  authorID: PlayerModel['id'];
}

export namespace AnswerModel {
  export interface DTO extends Model.DTO {
    description: string;
    questionID: string;
    authorID: string;
  }
}

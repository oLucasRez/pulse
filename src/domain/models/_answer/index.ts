import { Model, PlayerModel, QuestionModel } from '..';

export interface AnswerModel extends Model {
  description: string;
  questionID: QuestionModel['id'];
  authorID: PlayerModel['id'];
}

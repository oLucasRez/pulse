import { Model, PlayerModel, QuestionModel } from '..';

export interface AnswerModel extends Model {
  description: string;
  question: QuestionModel;
  author: PlayerModel;
}

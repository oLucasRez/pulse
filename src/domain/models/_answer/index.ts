import { Model } from '..';

export interface AnswerModel extends Model {
  description: string;
  questionID: string;
  authorID: string;
}

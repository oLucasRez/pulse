import { AnswerModel, PlayerModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { LandmarkModel, SubjectModel } from '..';

export interface QuestionModel extends LandmarkModel {
  position: Vector;
  description: string;
  subjectIDs: SubjectModel['id'][];
  authorID: PlayerModel['id'];
  answerIDs: AnswerModel['id'][];
  factID: AnswerModel['id'] | null;
}

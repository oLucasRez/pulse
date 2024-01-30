import { AnswerModel, PlayerModel } from '@domain/models';

import { vector } from '@domain/types';

import { LandmarkModel, SubjectModel } from '..';

export interface QuestionModel extends LandmarkModel {
  position: vector;
  description: string;
  subjectIDs: SubjectModel['id'][];
  authorID: PlayerModel['id'];
  answerIDs: AnswerModel['id'][];
  factID: AnswerModel['id'] | null;
}

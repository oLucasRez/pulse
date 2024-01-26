import { vector } from '@domain/types';

import { LandmarkModel } from '..';

export interface QuestionModel extends LandmarkModel {
  position: vector;
  description: string;
  subjectIDs: string[];
  authorID: string;
  answerIDs: string[];
  factID: string | null;
}

import { AnswerModel, PlayerModel } from '@domain/models';

import { Vector } from '@domain/utils';

import { LandmarkModel, SubjectModel } from '..';

export interface QuestionModel extends LandmarkModel {
  position: Vector;
  description: string;
  subjects: SubjectModel[];
  author: PlayerModel;
  answers: AnswerModel[];
  fact: AnswerModel | null;
}

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

export namespace QuestionModel {
  export type JSON = LandmarkModel.JSON & {
    position: Vector.JSON;
    description: string;
    subjectIDs: SubjectModel['id'][];
    authorID: PlayerModel['id'];
    answerIDs: AnswerModel['id'][];
    factID: AnswerModel['id'] | null;
  };
}

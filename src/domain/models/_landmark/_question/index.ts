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

export namespace QuestionModel {
  export interface DTO extends LandmarkModel.DTO {
    position: Vector.JSON;
    description: string;
    subjectIDs: string[];
    authorID: string;
    answerIDs: string[];
    factID: string | null;
  }
}

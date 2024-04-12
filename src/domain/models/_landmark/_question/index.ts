import { AnswerModel, PlayerModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { LandmarkModel, SubjectModel } from '..';

export interface QuestionModel extends LandmarkModel {
  position: Vector;
  subjectIDs: SubjectModel['id'][];
  authorID: PlayerModel['id'];
  factID: AnswerModel['id'] | null;
}

export namespace QuestionModel {
  export interface DTO extends LandmarkModel.DTO {
    position: Vector.JSON;
    subjectIDs: string[];
    authorID: string;
    factID: string | null;
  }
}

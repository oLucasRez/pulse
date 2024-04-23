import { Color } from '@domain/enums';
import { PlayerModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { LandmarkModel, SubjectModel } from '..';

export interface QuestionModel extends LandmarkModel {
  position: Vector;
  color: Color;
  solved: boolean;
  subjectIDs: SubjectModel['id'][];
  authorID: PlayerModel['id'];
}

export namespace QuestionModel {
  export interface DTO extends LandmarkModel.DTO {
    position: Vector.JSON;
    subjectIDs: string[];
    authorID: string;
  }
}

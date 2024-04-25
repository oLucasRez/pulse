import { Color } from '@domain/enums';
import { PlayerModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { LandmarkModel } from '..';

export interface QuestionModel extends LandmarkModel {
  position: Vector;
  color: Color;
  solved: boolean;
  authorID: PlayerModel['id'];
}

export namespace QuestionModel {
  export interface DTO extends LandmarkModel.DTO {
    position: Vector.JSON;
    order: number;
  }
}

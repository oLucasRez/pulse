import { Color } from '@domain/enums';
import { AnswerModel, PlayerModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { LandmarkModel } from '..';

export interface QuestionModel extends LandmarkModel {
  position: Vector;
  color: Color;
  authorID: PlayerModel['id'];
  factID: AnswerModel['id'] | null;
  votes: Record<
    PlayerModel['id'],
    {
      answerID: AnswerModel['id'] | null;
      upToDate: boolean;
    }
  >;
}

export namespace QuestionModel {
  export interface DTO extends LandmarkModel.DTO {
    position: Vector.JSON;
    order: number;
    votes: Record<
      string,
      {
        answerID: string | null;
        upToDate: boolean;
      }
    >;
  }
}

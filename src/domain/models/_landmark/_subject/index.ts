import { Color } from '@domain/enums';
import { PlayerModel, PulseModel } from '@domain/models';

import { LandmarkModel } from '..';

export interface SubjectModel extends LandmarkModel {
  color: Color;
  icon: string;
  authorID: PlayerModel['id'];
  pulseIDs: PulseModel<SubjectModel>['id'][];
}

export namespace SubjectModel {
  export interface DTO extends LandmarkModel.DTO {
    icon: string;
    order: number;
  }
}

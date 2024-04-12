import { Color } from '@domain/enums';
import { PlayerModel, SubjectPulseModel } from '@domain/models';

import { LandmarkModel } from '..';

export interface SubjectModel extends LandmarkModel {
  color: Color;
  icon: string;
  authorID: PlayerModel['id'];
  pathIDs: SubjectPulseModel['id'][];
}

export namespace SubjectModel {
  export interface DTO extends LandmarkModel.DTO {
    color: Color;
    icon: string;
    authorID: string;
    pathIDs: string[];
  }
}

import { Color } from '@domain/enums';
import { PlayerModel, SubjectPulseModel } from '@domain/models';

import { LandmarkModel } from '..';

export interface SubjectModel extends LandmarkModel {
  description: string;
  color: Color;
  icon: string;
  authorID: PlayerModel['id'];
  pathIDs: SubjectPulseModel['id'][];
}

export namespace SubjectModel {
  export interface DTO extends LandmarkModel.DTO {
    description: string;
    color: Color;
    icon: string;
    authorID: string;
    pathIDs: string[];
  }
}

import { Color } from '@domain/enums';

import { PlayerModel, SubjectPulseModel } from '@domain/models';

import { LandmarkModel } from '..';

export interface SubjectModel extends LandmarkModel {
  description: string;
  color: Color;
  authorID: PlayerModel['id'];
  pathIDs: SubjectPulseModel['id'][];
}

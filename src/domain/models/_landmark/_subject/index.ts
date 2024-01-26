import { Color } from '@domain/enums';

import { LandmarkModel } from '..';

export interface SubjectModel extends LandmarkModel {
  description: string;
  color: Color;
  authorID: string;
  pathIDs: [];
}

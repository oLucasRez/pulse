import { Vector } from '@domain/utils';

import { LandmarkModel } from '..';

export interface CentralFactModel extends LandmarkModel {
  position: Vector;
  description: string;
}

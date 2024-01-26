import { vector } from '@domain/types';

import { LandmarkModel } from '..';

export interface CentralFactModel extends LandmarkModel {
  position: vector;
  description: string;
}

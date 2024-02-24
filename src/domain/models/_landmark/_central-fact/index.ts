import { Vector } from '@domain/utils';

import { LandmarkModel } from '..';

export interface CentralFactModel extends LandmarkModel {
  position: Vector;
  description: string;
}

export namespace CentralFactModel {
  export type JSON = LandmarkModel.JSON & {
    position: Vector.JSON;
    description: string;
  };
}

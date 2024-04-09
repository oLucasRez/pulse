import { Vector } from '@domain/utils';

import { LandmarkModel } from '..';

export interface CentralFactModel extends LandmarkModel {
  position: Vector;
  description: string;
}

export namespace CentralFactModel {
  export interface DTO extends LandmarkModel.DTO {
    position: Vector.JSON;
    description: string;
  }
}

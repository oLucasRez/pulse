import { Color } from '@domain/enums';
import { Vector } from '@domain/utils';

import { Model } from '..';

export interface LandmarkModel extends Model {
  position: Vector | null;
  description: string;
  color: Color | null;
}

export namespace LandmarkModel {
  export interface DTO extends Model.DTO {
    position: Vector.JSON | null;
    description: string;
    color: Color | null;
  }
}

export * from './_central-fact';
export * from './_question';
export * from './_subject';

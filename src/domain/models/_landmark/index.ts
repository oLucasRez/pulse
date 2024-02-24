import { Vector } from '@domain/utils';

import { Model } from '..';

export interface LandmarkModel extends Model {
  position: Vector | null;
}

export namespace LandmarkModel {
  export type JSON = Model.JSON & {
    position: Vector.JSON | null;
  };
}

export * from './_central-fact';
export * from './_question';
export * from './_subject';

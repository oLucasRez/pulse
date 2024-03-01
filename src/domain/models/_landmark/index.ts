import { Vector } from '@domain/utils';

import { Model } from '..';

export interface LandmarkModel extends Model {
  position: Vector | null;
}

export * from './_central-fact';
export * from './_question';
export * from './_subject';

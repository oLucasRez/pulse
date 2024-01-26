import { vector } from '@domain/types';

import { Model } from '..';

export interface LandmarkModel extends Model {
  position: vector | null;
}

export * from './_central-fact';
export * from './_question';
export * from './_subject';

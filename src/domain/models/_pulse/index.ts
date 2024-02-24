import { Vector } from '@domain/utils';

import { LandmarkModel, Model } from '..';

export interface PulseModel<L extends LandmarkModel = LandmarkModel>
  extends Model {
  origin: Vector.JSON;
  gap: number;
  amount: number;
  landmarkID: L['id'];
}

export * from './_central-pulse';
export * from './_light-spot';
export * from './_subject-pulse';

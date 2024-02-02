import { vector } from '@domain/types';

import { LandmarkModel, Model } from '..';

export interface PulseModel<L extends LandmarkModel = LandmarkModel>
  extends Model {
  origin: vector;
  gap: number;
  amount: number;
  landmarkID: L['id'];
}

export * from './_central-pulse';
export * from './_light-spot';
export * from './_subject-pulse';

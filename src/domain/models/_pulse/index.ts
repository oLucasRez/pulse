import { vector } from '@domain/types';

import { Model } from '..';

export interface PulseModel extends Model {
  origin: vector;
  gap: number;
  amount: number;
  landmarkID: string;
}

export * from './_central-pulse';
export * from './_light-spot';
export * from './_subject-pulse';

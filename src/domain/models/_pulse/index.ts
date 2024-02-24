import { Vector } from '@domain/utils';

import { LandmarkModel, Model } from '..';

export interface PulseModel<L extends LandmarkModel> extends Model {
  origin: Vector;
  gap: number;
  amount: number;
  landmark: L;
}

export namespace PulseModel {
  export type JSON = Model.JSON & {
    origin: Vector.JSON;
    gap: number;
    amount: number;
    landmarkID: LandmarkModel['id'];
  };
}

export * from './_central-pulse';
export * from './_light-spot';
export * from './_subject-pulse';

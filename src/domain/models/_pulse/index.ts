import { Vector } from '@domain/utils';

import { LandmarkModel, Model } from '..';

export interface PulseModel<L extends LandmarkModel> extends Model {
  origin: Vector;
  gap: number;
  amount: number;
  landmarkID: L['id'] | null;
}

export namespace PulseModel {
  export interface DTO extends Model.DTO {
    origin: Vector.JSON;
    gap: number;
    amount: number;
    landmarkID: string | null;
  }
}

export * from './_central-pulse';
export * from './_light-spot';
export * from './_subject-pulse';

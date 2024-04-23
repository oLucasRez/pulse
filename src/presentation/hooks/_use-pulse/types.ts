import { LandmarkModel, PulseModel } from '@domain/models';

export type PulseHookReturn = {
  pulses: PulseModel<LandmarkModel>[];
};

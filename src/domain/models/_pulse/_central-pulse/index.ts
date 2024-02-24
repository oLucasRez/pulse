import { CentralFactModel } from '@domain/models';

import { PulseModel } from '..';

export interface CentralPulseModel extends PulseModel<CentralFactModel> {}

export namespace CentralPulseModel {
  export type JSON = PulseModel.JSON;
}

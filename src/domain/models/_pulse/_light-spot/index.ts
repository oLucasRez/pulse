import { SubjectModel } from '@domain/models';

import { PulseModel } from '..';

export interface LightSpotModel extends PulseModel<SubjectModel> {}

export namespace LightSpotModel {
  export type JSON = PulseModel.JSON;
}

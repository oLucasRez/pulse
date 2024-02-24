import { SubjectModel } from '@domain/models';

import { PulseModel } from '..';

export interface SubjectPulseModel extends PulseModel<SubjectModel> {}

export namespace SubjectPulseModel {
  export type JSON = PulseModel.JSON;
}

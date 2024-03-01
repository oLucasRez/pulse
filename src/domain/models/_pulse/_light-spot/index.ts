import { SubjectModel } from '@domain/models';

import { PulseModel } from '..';

export interface LightSpotModel extends PulseModel<SubjectModel> {}

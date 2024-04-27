import { CentralFactModel } from '@domain/models';

import { PulseModel } from '..';

export interface CentralPulseModel extends PulseModel<CentralFactModel> {
  landmarkID: CentralFactModel['id'];
  overloaded: false;
}

export namespace CentralPulseModel {
  export interface DTO extends PulseModel.DTO {
    landmarkID: string;
  }
}

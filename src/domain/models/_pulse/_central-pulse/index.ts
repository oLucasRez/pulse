import { CentralFactModel } from '@domain/models';

import { JSON } from '@domain/types';

import { PulseModel } from '..';

export interface CentralPulseModel extends PulseModel<CentralFactModel> {}

export namespace CentralPulseModel {
  export function toJSON(): JSON {
    return {};
  }
}

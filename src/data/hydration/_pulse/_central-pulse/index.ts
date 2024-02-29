import { CentralPulseModel, PulseModel } from '@domain/models';

import {
  CentralFactCollection,
  CentralPulseCollection,
} from '@data/collections';

import { CentralPulseCRUD } from '@data/cruds';

import { Vector } from '@domain/utils';

import { PulseHydrator } from '..';

export class CentralPulseHydrator {
  public static async hydrate(
    dto: CentralPulseCRUD.DTO,
  ): Promise<CentralPulseModel> {
    const centralPulse: CentralPulseModel = Object.assign<
      PulseModel<any>,
      Omit<CentralPulseModel, keyof PulseModel<any>>
    >(await PulseHydrator.hydrate(dto), {
      origin: Vector.fromJSON(dto.origin),
      gap: dto.gap,
      amount: dto.amount,
      landmark: CentralFactCollection.get(dto.landmarkID),
    });

    CentralPulseCollection.append(dto.id, centralPulse);

    return centralPulse;
  }
}

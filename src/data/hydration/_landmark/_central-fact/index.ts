import { CentralFactModel, LandmarkModel } from '@domain/models';

import { CentralFactCollection } from '@data/collections';

import { CentralFactCRUD } from '@data/cruds';

import { Vector } from '@domain/utils';

import { LandmarkHydrator } from '..';

export class CentralFactHydrator {
  public static async hydrate(
    dto: CentralFactCRUD.DTO,
  ): Promise<CentralFactModel> {
    const centralFact: CentralFactModel = Object.assign<
      LandmarkModel,
      Omit<CentralFactModel, keyof LandmarkModel> &
        Pick<CentralFactModel, 'position'>
    >(await LandmarkHydrator.hydrate(dto), {
      position: Vector.fromJSON(dto.position),
      description: dto.description,
    });

    CentralFactCollection.append(dto.id, centralFact);

    return centralFact;
  }
}

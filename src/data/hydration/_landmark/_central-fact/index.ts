import { CentralFactModel, LandmarkModel } from '@domain/models';

import { CentralFactCRUD } from '@data/cruds';

import { Vector } from '@domain/utils';

import { LandmarkHydrator } from '..';

export class CentralFactHydrator {
  public static hydrate(dto: CentralFactCRUD.DTO): CentralFactModel {
    const centralFact: CentralFactModel = Object.assign<
      LandmarkModel,
      Omit<CentralFactModel, keyof LandmarkModel> &
        Pick<CentralFactModel, 'position'>
    >(LandmarkHydrator.hydrate(dto), {
      position: Vector.fromJSON(dto.position),
      description: dto.description,
    });

    return centralFact;
  }
}

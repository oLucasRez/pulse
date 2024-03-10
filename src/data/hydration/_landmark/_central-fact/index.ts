import { CentralFactModel, LandmarkModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { CentralFactDAO } from '@data/dao';

import { LandmarkHydrator } from '..';

export class CentralFactHydrator {
  public static hydrate(dto: CentralFactDAO.DTO): CentralFactModel {
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

import { CentralFactModel, LandmarkModel } from '@domain/models';
import { Vector } from '@domain/utils';

import { LandmarkHydrator } from '..';

export class CentralFactHydrator {
  public static hydrate(dto: CentralFactModel.DTO): CentralFactModel {
    const centralFact: CentralFactModel = Object.assign<
      LandmarkModel,
      Omit<CentralFactModel, keyof LandmarkModel> &
        Pick<CentralFactModel, 'position'>
    >(LandmarkHydrator.hydrate(dto), {
      position: Vector.fromJSON(dto.position),
    });

    return centralFact;
  }
}

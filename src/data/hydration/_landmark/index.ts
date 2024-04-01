import { LandmarkModel, Model } from '@domain/models';
import { Vector } from '@domain/utils';

import { LandmarkDAO } from '@data/dao';

import { ModelHydrator } from '..';

export class LandmarkHydrator {
  public static hydrate(dto: LandmarkDAO.DTO): LandmarkModel {
    const landmark: LandmarkModel = Object.assign<
      Model,
      Omit<LandmarkModel, keyof Model>
    >(ModelHydrator.hydrate(dto), {
      position: dto.position ? Vector.fromJSON(dto.position) : null,
    });

    return landmark;
  }
}

export * from './_central-fact';
export * from './_question';
export * from './_subject';

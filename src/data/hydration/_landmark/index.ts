import { LandmarkModel, Model } from '@domain/models';

import { LandmarkCollection } from '@data/collections';

import { LandmarkCRUD } from '@data/cruds';

import { Vector } from '@domain/utils';

import { ModelHydrator } from '..';

export class LandmarkHydrator {
  public static async hydrate(dto: LandmarkCRUD.DTO): Promise<LandmarkModel> {
    const landmark: LandmarkModel = Object.assign<
      Model,
      Omit<LandmarkModel, keyof Model>
    >(await ModelHydrator.hydrate(dto), {
      position: dto.position ? Vector.fromJSON(dto.position) : null,
    });

    LandmarkCollection.append(dto.id, landmark);

    return landmark;
  }
}

export * from './_central-fact';
export * from './_subject';

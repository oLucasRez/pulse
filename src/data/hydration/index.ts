import { Model } from '@domain/models';

import { ModelDAO } from '@data/dao';

export class ModelHydrator {
  public static hydrate(dto: ModelDAO.DTO): Model {
    const model: Model = {
      id: dto.id,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };

    return model;
  }
}

export * from './_dice';
export * from './_game';
export * from './_landmark';
export * from './_player';
export * from './_pulse';
export * from './_round';
export * from './_user';

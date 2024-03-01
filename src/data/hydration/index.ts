import { Model } from '@domain/models';

import { ModelCollection } from '@data/collections';

import { ModelCRUD } from '@data/cruds';

export class ModelHydrator {
  public static async hydrate(dto: ModelCRUD.DTO): Promise<Model> {
    const model: Model = {
      id: dto.id,
      createdAt: new Date(dto.createdAt),
      updatedAt: new Date(dto.updatedAt),
    };

    ModelCollection.append(dto.id, model);

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

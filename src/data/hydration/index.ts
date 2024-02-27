import { Model } from '@domain/models';

import { ModelCollection } from '@data/collections';

export class ModelHydrator {
  public static hydrate(json: Model.JSON): Model {
    const model: Model = {
      id: json.id,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
    };

    ModelCollection.append(json.id, model);

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

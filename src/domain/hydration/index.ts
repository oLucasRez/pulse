import { Model } from '@domain/models';

import { ModelCollection } from '@domain/collections';

export class ModelHydrator {
  public static hydrate(json: Model.JSON): Model {
    const model: Model = {
      id: json.id,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
    };

    const collection = ModelCollection.getCollection();

    if (collection[json.id]) Object.assign(collection[json.id], model);
    else collection[json.id] = model;

    return model;
  }
}

export * from './_dice';
export * from './_game';
export * from './_landmark';
export * from './_player';
export * from './_pulse';
export * from './_user';

import { Model } from '@domain/models';

export class ModelCollection {
  private static instance: ModelCollection;

  private readonly collection: Record<string, Model> = {};

  private constructor() {}

  private static getInstance(): ModelCollection {
    if (!ModelCollection.instance)
      ModelCollection.instance = new ModelCollection();

    return ModelCollection.instance;
  }

  public static getCollection(): Record<string, Model> {
    return ModelCollection.getInstance().collection;
  }

  public static get(id: string): Model {
    return ModelCollection.getInstance().collection[id];
  }
}

export * from './_dice';
export * from './_game';
export * from './_landmark';
export * from './_player';
export * from './_pulse';
export * from './_user';

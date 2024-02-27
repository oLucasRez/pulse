import { LandmarkModel } from '@domain/models';

export class LandmarkCollection {
  private static instance: LandmarkCollection;

  private readonly collection: Record<string, LandmarkModel> = {};

  private constructor() {}

  private static getInstance(): LandmarkCollection {
    if (!LandmarkCollection.instance)
      LandmarkCollection.instance = new LandmarkCollection();

    return LandmarkCollection.instance;
  }

  public static getCollection(): Record<string, LandmarkModel> {
    return LandmarkCollection.getInstance().collection;
  }

  public static get(id: string): LandmarkModel {
    return LandmarkCollection.getInstance().collection[id];
  }

  public static append(id: string, value: LandmarkModel): void {
    const collection = LandmarkCollection.getCollection();

    if (collection[id]) Object.assign(collection[id], value);
    else collection[id] = value;
  }
}

export * from './_central-fact';
export * from './_subject';

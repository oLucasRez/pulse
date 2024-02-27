import { RoundModel } from '@domain/models';

export class RoundCollection {
  private static instance: RoundCollection;

  private readonly collection: Record<string, RoundModel> = {};

  private constructor() {}

  private static getInstance(): RoundCollection {
    if (!RoundCollection.instance)
      RoundCollection.instance = new RoundCollection();

    return RoundCollection.instance;
  }

  public static getCollection(): Record<string, RoundModel> {
    return RoundCollection.getInstance().collection;
  }

  public static get(id: string): RoundModel {
    return RoundCollection.getInstance().collection[id];
  }

  public static append(id: string, value: RoundModel): void {
    const collection = RoundCollection.getCollection();

    if (collection[id]) Object.assign(collection[id], value);
    else collection[id] = value;
  }
}

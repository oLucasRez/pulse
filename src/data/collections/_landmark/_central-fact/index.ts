import { CentralFactModel } from '@domain/models';

export class CentralFactCollection {
  private static instance: CentralFactCollection;

  private readonly collection: Record<string, CentralFactModel> = {};

  private constructor() {}

  private static getInstance(): CentralFactCollection {
    if (!CentralFactCollection.instance)
      CentralFactCollection.instance = new CentralFactCollection();

    return CentralFactCollection.instance;
  }

  public static getCollection(): Record<string, CentralFactModel> {
    return CentralFactCollection.getInstance().collection;
  }

  public static get(id: string): CentralFactModel {
    return CentralFactCollection.getInstance().collection[id];
  }

  public static append(id: string, value: CentralFactModel): void {
    const collection = CentralFactCollection.getCollection();

    if (collection[id]) Object.assign(collection[id], value);
    else collection[id] = value;
  }
}

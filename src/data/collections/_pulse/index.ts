import { LandmarkModel, PulseModel } from '@domain/models';

export class PulseCollection {
  private static instance: PulseCollection;

  private readonly collection: Record<string, PulseModel<LandmarkModel>> = {};

  private constructor() {}

  private static getInstance(): PulseCollection {
    if (!PulseCollection.instance)
      PulseCollection.instance = new PulseCollection();

    return PulseCollection.instance;
  }

  public static getCollection(): Record<string, PulseModel<LandmarkModel>> {
    return PulseCollection.getInstance().collection;
  }

  public static get(id: string): PulseModel<LandmarkModel> {
    return PulseCollection.getInstance().collection[id];
  }

  public static append(id: string, value: PulseModel<LandmarkModel>): void {
    const collection = PulseCollection.getCollection();

    if (collection[id]) Object.assign(collection[id], value);
    else collection[id] = value;
  }
}

export * from './_central-pulse';
export * from './_subject-pulse';

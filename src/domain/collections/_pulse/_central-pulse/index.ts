import { CentralPulseModel } from '@domain/models';

export class CentralPulseCollection {
  private static instance: CentralPulseCollection;

  private readonly collection: Record<string, CentralPulseModel> = {};

  private constructor() {}

  private static getInstance(): CentralPulseCollection {
    if (!CentralPulseCollection.instance)
      CentralPulseCollection.instance = new CentralPulseCollection();

    return CentralPulseCollection.instance;
  }

  public static getCollection(): Record<string, CentralPulseModel> {
    return CentralPulseCollection.getInstance().collection;
  }

  public static get(id: string): CentralPulseModel {
    return CentralPulseCollection.getInstance().collection[id];
  }
}

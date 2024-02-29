import { CentralPulseModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GetCentralPulseUsecase } from '@domain/usecases';

import { makeGetCentralPulseUsecase } from '@main/factories';

export class CentralPulseCollection {
  private static instance: CentralPulseCollection;

  private readonly collection: Record<string, CentralPulseModel> = {};

  private readonly getCentralPulse: GetCentralPulseUsecase;
  private constructor() {
    // @todo: injeção de dependência
    this.getCentralPulse = makeGetCentralPulseUsecase();
  }

  private static getInstance(): CentralPulseCollection {
    if (!CentralPulseCollection.instance)
      CentralPulseCollection.instance = new CentralPulseCollection();

    return CentralPulseCollection.instance;
  }

  public static getCollection(): Record<string, CentralPulseModel> {
    return CentralPulseCollection.getInstance().collection;
  }

  public static async get(id: string): Promise<CentralPulseModel> {
    const instance = CentralPulseCollection.getInstance();

    let centralPulse: CentralPulseModel | null = instance.collection[id];

    if (!centralPulse) centralPulse = await instance.getCentralPulse.execute();

    if (!centralPulse)
      throw new NotFoundError({
        metadata: { entity: 'CentralPulse', prop: 'id', value: id },
      });

    CentralPulseCollection.append(id, centralPulse);

    return centralPulse;
  }

  public static append(id: string, value: CentralPulseModel): void {
    const collection = CentralPulseCollection.getCollection();

    if (collection[id]) Object.assign(collection[id], value);
    else collection[id] = value;
  }
}

import { CentralFactModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GetCentralFactUsecase } from '@domain/usecases';

import { makeGetCentralFactUsecase } from '@main/factories';

export class CentralFactCollection {
  private static instance: CentralFactCollection;

  private readonly collection: Record<string, CentralFactModel> = {};

  private readonly getCentralFact: GetCentralFactUsecase;
  private constructor() {
    // @todo: injeção de dependência
    this.getCentralFact = makeGetCentralFactUsecase();
  }

  private static getInstance(): CentralFactCollection {
    if (!CentralFactCollection.instance)
      CentralFactCollection.instance = new CentralFactCollection();

    return CentralFactCollection.instance;
  }

  public static getCollection(): Record<string, CentralFactModel> {
    return CentralFactCollection.getInstance().collection;
  }

  public static async get(id: string): Promise<CentralFactModel> {
    const instance = CentralFactCollection.getInstance();

    let centralFact: CentralFactModel | null = instance.collection[id];

    if (!centralFact) centralFact = await instance.getCentralFact.execute();

    if (!centralFact)
      throw new NotFoundError({
        metadata: { entity: 'Subject', prop: 'id', value: id },
      });

    CentralFactCollection.append(id, centralFact);

    return centralFact;
  }

  public static append(id: string, value: CentralFactModel): void {
    const collection = CentralFactCollection.getCollection();

    if (collection[id]) Object.assign(collection[id], value);
    else collection[id] = value;
  }
}

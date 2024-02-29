import { RoundModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GetRoundUsecase } from '@domain/usecases';

import { makeGetRoundUsecase } from '@main/factories';

export class RoundCollection {
  private static instance: RoundCollection;

  private readonly collection: Record<string, RoundModel> = {};

  private readonly getRound: GetRoundUsecase;
  private constructor() {
    // @todo: injeção de dependência
    this.getRound = makeGetRoundUsecase();
  }

  private static getInstance(): RoundCollection {
    if (!RoundCollection.instance)
      RoundCollection.instance = new RoundCollection();

    return RoundCollection.instance;
  }

  public static getCollection(): Record<string, RoundModel> {
    return RoundCollection.getInstance().collection;
  }

  public static async get(id: string): Promise<RoundModel> {
    const instance = RoundCollection.getInstance();

    let round: RoundModel | null = instance.collection[id];

    if (!round) round = await instance.getRound.execute(id);

    if (!round)
      throw new NotFoundError({
        metadata: { entity: 'Round', prop: 'id', value: id },
      });

    RoundCollection.append(id, round);

    return round;
  }

  public static append(id: string, value: RoundModel): void {
    const collection = RoundCollection.getCollection();

    if (collection[id]) Object.assign(collection[id], value);
    else collection[id] = value;
  }
}

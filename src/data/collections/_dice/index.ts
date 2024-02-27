import { DiceModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GetDiceUsecase } from '@domain/usecases';

import { makeGetDiceUsecase } from '@main/factories';

export class DiceCollection {
  private static instance: DiceCollection;

  private readonly collection: Record<string, DiceModel> = {};

  private readonly getDice: GetDiceUsecase;
  private constructor() {
    this.getDice = makeGetDiceUsecase();
  }

  private static getInstance(): DiceCollection {
    if (!DiceCollection.instance)
      DiceCollection.instance = new DiceCollection();

    return DiceCollection.instance;
  }

  public static getCollection(): Record<string, DiceModel> {
    return DiceCollection.getInstance().collection;
  }

  public static async get(id: string): Promise<DiceModel> {
    const instance = DiceCollection.getInstance();

    let dice: DiceModel | null = instance.collection[id];

    if (!dice) dice = await instance.getDice.execute(id);

    if (!dice)
      throw new NotFoundError({
        metadata: { entity: 'Dice', prop: 'id', value: id },
      });

    return dice;
  }

  public static append(id: string, value: DiceModel): void {
    const collection = DiceCollection.getCollection();

    if (collection[id]) Object.assign(collection[id], value);
    else collection[id] = value;
  }
}

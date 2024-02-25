import { DiceModel } from '@domain/models';

export class DiceCollection {
  private static instance: DiceCollection;

  private readonly collection: Record<string, DiceModel> = {};

  private constructor() {}

  private static getInstance(): DiceCollection {
    if (!DiceCollection.instance)
      DiceCollection.instance = new DiceCollection();

    return DiceCollection.instance;
  }

  public static getCollection(): Record<string, DiceModel> {
    return DiceCollection.getInstance().collection;
  }

  public static get(id: string): DiceModel {
    return DiceCollection.getInstance().collection[id];
  }
}

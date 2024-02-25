import { PlayerModel } from '@domain/models';

export class PlayerCollection {
  private static instance: PlayerCollection;

  private readonly collection: Record<string, PlayerModel> = {};

  private constructor() {}

  private static getInstance(): PlayerCollection {
    if (!PlayerCollection.instance)
      PlayerCollection.instance = new PlayerCollection();

    return PlayerCollection.instance;
  }

  public static getCollection(): Record<string, PlayerModel> {
    return PlayerCollection.getInstance().collection;
  }

  public static get(id: string): PlayerModel {
    return PlayerCollection.getInstance().collection[id];
  }
}

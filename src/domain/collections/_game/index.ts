import { GameModel } from '@domain/models';

export class GameCollection {
  private static instance: GameCollection;

  private readonly collection: Record<string, GameModel> = {};

  private constructor() {}

  private static getInstance(): GameCollection {
    if (!GameCollection.instance)
      GameCollection.instance = new GameCollection();

    return GameCollection.instance;
  }

  public static getCollection(): Record<string, GameModel> {
    return GameCollection.getInstance().collection;
  }

  public static get(id: string): GameModel {
    return GameCollection.getInstance().collection[id];
  }
}

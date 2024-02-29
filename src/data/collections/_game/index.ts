import { GameModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GetGameUsecase } from '@domain/usecases';

import { makeGetGameUsecase } from '@main/factories';

export class GameCollection {
  private static instance: GameCollection;

  private readonly collection: Record<string, GameModel> = {};

  private readonly getGame: GetGameUsecase;
  private constructor() {
    // @todo: injeção de dependência
    this.getGame = makeGetGameUsecase();
  }

  private static getInstance(): GameCollection {
    if (!GameCollection.instance)
      GameCollection.instance = new GameCollection();

    return GameCollection.instance;
  }

  public static getCollection(): Record<string, GameModel> {
    return GameCollection.getInstance().collection;
  }

  public static async get(id: string): Promise<GameModel> {
    const instance = GameCollection.getInstance();

    let game: GameModel | null = instance.collection[id];

    if (!game) game = await instance.getGame.execute(id);

    if (!game)
      throw new NotFoundError({
        metadata: { entity: 'Dice', prop: 'id', value: id },
      });

    GameCollection.append(id, game);

    return game;
  }

  public static append(id: string, value: GameModel): void {
    const collection = GameCollection.getCollection();

    if (collection[id]) Object.assign(collection[id], value);
    else collection[id] = value;
  }
}

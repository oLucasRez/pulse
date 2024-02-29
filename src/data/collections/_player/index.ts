import { PlayerModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { GetPlayerUsecase } from '@domain/usecases';

import { makeGetPlayerUsecase } from '@main/factories';

export class PlayerCollection {
  private static instance: PlayerCollection;

  private readonly collection: Record<string, PlayerModel> = {};

  private readonly getPlayer: GetPlayerUsecase;
  private constructor() {
    // @todo: injeção de dependência
    this.getPlayer = makeGetPlayerUsecase();
  }

  private static getInstance(): PlayerCollection {
    if (!PlayerCollection.instance)
      PlayerCollection.instance = new PlayerCollection();

    return PlayerCollection.instance;
  }

  public static getCollection(): Record<string, PlayerModel> {
    return PlayerCollection.getInstance().collection;
  }

  public static async get(id: string): Promise<PlayerModel> {
    const instance = PlayerCollection.getInstance();

    let player: PlayerModel | null = instance.collection[id];

    if (!player) player = await instance.getPlayer.execute(id);

    if (!player)
      throw new NotFoundError({
        metadata: { entity: 'Player', prop: 'id', value: id },
      });

    PlayerCollection.append(id, player);

    return player;
  }

  public static append(id: string, value: PlayerModel): void {
    const collection = PlayerCollection.getCollection();

    if (collection[id]) Object.assign(collection[id], value);
    else collection[id] = value;
  }
}

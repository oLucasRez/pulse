import { PlayerModel } from '@domain/models';

import { PlayerHydrator } from '@data/hydration';

import { GetPlayerUsecase } from '@domain/usecases';

import { FetchPlayerObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class CRUDGetPlayerUsecase implements GetPlayerUsecase {
  private readonly fetchPlayerPublisher: FetchPlayerObserver.Publisher;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDGetPlayerUsecase.Deps) {
    this.fetchPlayerPublisher = deps.fetchPlayerPublisher;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(id: string): Promise<PlayerModel | null> {
    const dto = await this.playerCRUD.read(id);

    const player = dto ? PlayerHydrator.hydrate(dto) : null;

    this.fetchPlayerPublisher.notifyFetchPlayer(id, player);

    return player;
  }
}

export namespace CRUDGetPlayerUsecase {
  export type Deps = {
    fetchPlayerPublisher: FetchPlayerObserver.Publisher;
    playerCRUD: PlayerCRUD;
  };
}

import { PlayerModel } from '@domain/models';

import { PlayerHydrator } from '@data/hydration';

import { GetPlayerUsecase } from '@domain/usecases';

import { PlayerObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class CRUDGetPlayerUsecase implements GetPlayerUsecase {
  private readonly playerPublisher: PlayerObserver.Publisher;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDGetPlayerUsecase.Deps) {
    this.playerPublisher = deps.playerPublisher;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(id: string): Promise<PlayerModel | null> {
    const dto = await this.playerCRUD.read(id);

    const player = dto ? PlayerHydrator.hydrate(dto) : null;

    this.playerPublisher.notifyFetchPlayer(player);

    return player;
  }
}

export namespace CRUDGetPlayerUsecase {
  export type Deps = {
    playerPublisher: PlayerObserver.Publisher;
    playerCRUD: PlayerCRUD;
  };
}

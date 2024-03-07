import { PlayerModel } from '@domain/models';

import { PlayerHydrator } from '@data/hydration';

import { SetPlayerDiceUsecase } from '@domain/usecases';

import { PlayerObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class CRUDSetPlayerDiceUsecase implements SetPlayerDiceUsecase {
  private readonly playerPublisher: PlayerObserver.Publisher;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDSetPlayerDiceUsecase.Deps) {
    this.playerPublisher = deps.playerPublisher;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(id: string, diceID: string): Promise<PlayerModel> {
    const dto = await this.playerCRUD.update(id, {
      diceID,
    });

    const player = PlayerHydrator.hydrate(dto);

    this.playerPublisher.notifyChangePlayer(player);

    return player;
  }
}

export namespace CRUDSetPlayerDiceUsecase {
  export type Deps = {
    playerPublisher: PlayerObserver.Publisher;
    playerCRUD: PlayerCRUD;
  };
}

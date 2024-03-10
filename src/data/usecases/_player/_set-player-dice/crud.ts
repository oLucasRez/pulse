import { PlayerModel } from '@domain/models';

import { PlayerHydrator } from '@data/hydration';

import { SetPlayerDiceUsecase } from '@domain/usecases';

import { ChangePlayerObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class CRUDSetPlayerDiceUsecase implements SetPlayerDiceUsecase {
  private readonly changePlayerPublisher: ChangePlayerObserver.Publisher;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDSetPlayerDiceUsecase.Deps) {
    this.changePlayerPublisher = deps.changePlayerPublisher;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(id: string, diceID: string): Promise<PlayerModel> {
    const dto = await this.playerCRUD.update(id, {
      diceID,
    });

    const player = PlayerHydrator.hydrate(dto);

    this.changePlayerPublisher.notifyChangePlayer(player);

    return player;
  }
}

export namespace CRUDSetPlayerDiceUsecase {
  export type Deps = {
    changePlayerPublisher: ChangePlayerObserver.Publisher;
    playerCRUD: PlayerCRUD;
  };
}

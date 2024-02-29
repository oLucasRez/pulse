import { PlayerModel } from '@domain/models';

import { PlayerHydrator } from '@data/hydration';

import { SetPlayerDiceUsecase } from '@domain/usecases';

import { PlayerCRUD } from '@data/cruds';

export class CRUDSetPlayerDiceUsecase implements SetPlayerDiceUsecase {
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDSetPlayerDiceUsecase.Deps) {
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(id: string, diceID: string): Promise<PlayerModel> {
    const playerDTO = await this.playerCRUD.update(id, {
      diceID,
    });

    return PlayerHydrator.hydrate(playerDTO);
  }
}

export namespace CRUDSetPlayerDiceUsecase {
  export type Deps = {
    playerCRUD: PlayerCRUD;
  };
}

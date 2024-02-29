import { PlayerModel } from '@domain/models';

import { PlayerHydrator } from '@data/hydration';

import { GetPlayerUsecase } from '@domain/usecases';

import { PlayerCRUD } from '@data/cruds';

export class CRUDGetPlayerUsecase implements GetPlayerUsecase {
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDGetPlayerUsecase.Deps) {
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(id: string): Promise<PlayerModel | null> {
    const playerDTO = await this.playerCRUD.read(id);

    return playerDTO ? PlayerHydrator.hydrate(playerDTO) : null;
  }
}

export namespace CRUDGetPlayerUsecase {
  export type Deps = {
    playerCRUD: PlayerCRUD;
  };
}

import { PlayerModel } from '@domain/models';

import { PlayerHydrator } from '@data/hydration';

import { GetPlayersUsecase } from '@domain/usecases';

import { PlayerCRUD } from '@data/cruds';

export class CRUDGetPlayersUsecase implements GetPlayersUsecase {
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDGetPlayersUsecase.Deps) {
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(): Promise<PlayerModel[]> {
    const playerDTOs = await this.playerCRUD.read();

    return Promise.all(playerDTOs.map(PlayerHydrator.hydrate));
  }
}

export namespace CRUDGetPlayersUsecase {
  export type Deps = {
    playerCRUD: PlayerCRUD;
  };
}
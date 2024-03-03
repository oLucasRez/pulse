import { PlayerModel } from '@domain/models';

import { PlayerHydrator } from '@data/hydration';

import { GetPlayersUsecase } from '@domain/usecases';

import { PlayerCRUD } from '@data/cruds';

export class CRUDGetPlayersUsecase implements GetPlayersUsecase {
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDGetPlayersUsecase.Deps) {
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(
    options: GetPlayersUsecase.Options = {},
  ): Promise<PlayerModel[]> {
    const { includeBanned = false } = options;

    const playerDTOs = await this.playerCRUD.read();

    if (includeBanned) return playerDTOs.map(PlayerHydrator.hydrate);

    const notBannedPlayerDTOs = playerDTOs.filter(
      (playerDTO) => !playerDTO.banned,
    );

    return notBannedPlayerDTOs.map(PlayerHydrator.hydrate);
  }
}

export namespace CRUDGetPlayersUsecase {
  export type Deps = {
    playerCRUD: PlayerCRUD;
  };
}

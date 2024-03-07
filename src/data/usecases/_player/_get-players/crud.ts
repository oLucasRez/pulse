import { PlayerModel } from '@domain/models';

import { PlayerHydrator } from '@data/hydration';

import { GetPlayersUsecase } from '@domain/usecases';

import { PlayerObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class CRUDGetPlayersUsecase implements GetPlayersUsecase {
  private readonly playerPublisher: PlayerObserver.Publisher;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDGetPlayersUsecase.Deps) {
    this.playerPublisher = deps.playerPublisher;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(
    options: GetPlayersUsecase.Options = {},
  ): Promise<PlayerModel[]> {
    const { includeBanned = false } = options;

    const playerDTOs = await this.playerCRUD.read();

    if (includeBanned) return playerDTOs.map(PlayerHydrator.hydrate);

    const dto = playerDTOs.filter((playerDTO) => !playerDTO.banned);

    const players = dto.map(PlayerHydrator.hydrate);

    this.playerPublisher.notifyFetchPlayers(players);

    return players;
  }
}

export namespace CRUDGetPlayersUsecase {
  export type Deps = {
    playerPublisher: PlayerObserver.Publisher;
    playerCRUD: PlayerCRUD;
  };
}

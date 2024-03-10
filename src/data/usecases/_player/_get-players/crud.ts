import { PlayerModel } from '@domain/models';

import { PlayerHydrator } from '@data/hydration';

import { GetPlayersUsecase } from '@domain/usecases';

import { FetchPlayersObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class CRUDGetPlayersUsecase implements GetPlayersUsecase {
  private readonly fetchPlayersPublisher: FetchPlayersObserver.Publisher;
  private readonly playerCRUD: PlayerCRUD;

  public constructor(deps: CRUDGetPlayersUsecase.Deps) {
    this.fetchPlayersPublisher = deps.fetchPlayersPublisher;
    this.playerCRUD = deps.playerCRUD;
  }

  public async execute(
    options: GetPlayersUsecase.Options = {},
  ): Promise<PlayerModel[]> {
    const { includeBanned = false } = options;

    const dto = await this.playerCRUD.read();

    const players = dto.map(PlayerHydrator.hydrate);

    this.fetchPlayersPublisher.notifyFetchPlayers(players);

    if (includeBanned) return players;

    return players.filter((value) => !value.banned);
  }
}

export namespace CRUDGetPlayersUsecase {
  export type Deps = {
    fetchPlayersPublisher: FetchPlayersObserver.Publisher;
    playerCRUD: PlayerCRUD;
  };
}

import { PlayerModel } from '@domain/models';
import { GetPlayersUsecase } from '@domain/usecases';

import { PlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { FetchPlayersObserver } from '@data/observers';

export class DAOGetPlayersUsecase implements GetPlayersUsecase {
  private readonly fetchPlayersPublisher: FetchPlayersObserver.Publisher;
  private readonly playerDAO: PlayerDAO;

  public constructor(deps: DAOGetPlayersUsecase.Deps) {
    this.fetchPlayersPublisher = deps.fetchPlayersPublisher;
    this.playerDAO = deps.playerDAO;
  }

  public async execute(
    options: GetPlayersUsecase.Options = {},
  ): Promise<PlayerModel[]> {
    const { includeBanned = false } = options;

    const dto = await this.playerDAO.read();

    const players = dto.map(PlayerHydrator.hydrate);

    this.fetchPlayersPublisher.notifyFetchPlayers(players);

    if (includeBanned) return players;

    return players.filter((value) => !value.banned);
  }
}

export namespace DAOGetPlayersUsecase {
  export type Deps = {
    fetchPlayersPublisher: FetchPlayersObserver.Publisher;
    playerDAO: PlayerDAO;
  };
}

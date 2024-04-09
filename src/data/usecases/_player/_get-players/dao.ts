import { PlayerModel } from '@domain/models';
import { GetPlayersUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { FetchPlayersObserver } from '@data/observers';

export class DAOGetPlayersUsecase implements GetPlayersUsecase {
  private readonly fetchPlayersPublisher: FetchPlayersObserver.Publisher;
  private readonly playerDAO: IPlayerDAO;

  public constructor(deps: DAOGetPlayersUsecase.Deps) {
    this.fetchPlayersPublisher = deps.fetchPlayersPublisher;
    this.playerDAO = deps.playerDAO;
  }

  public async execute(
    options: GetPlayersUsecase.Options = {},
  ): Promise<PlayerModel[]> {
    const { includeBanned = false } = options;

    const dto = includeBanned
      ? await this.playerDAO.getAll()
      : await this.playerDAO.getUnbanned();

    const players = dto.map(PlayerHydrator.hydrate);

    this.fetchPlayersPublisher.notifyFetchPlayers(players);

    if (includeBanned) return players;

    return players.filter((value) => !value.banned);
  }
}

export namespace DAOGetPlayersUsecase {
  export type Deps = {
    fetchPlayersPublisher: FetchPlayersObserver.Publisher;
    playerDAO: IPlayerDAO;
  };
}

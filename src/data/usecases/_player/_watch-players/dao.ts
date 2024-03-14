import { WatchPlayersUsecase } from '@domain/usecases';

import { PlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { FetchPlayersObserver } from '@data/observers';

export class DAOWatchPlayersUsecase implements WatchPlayersUsecase {
  private readonly playerDAO: PlayerDAO;
  private readonly fetchPlayersPublisher: FetchPlayersObserver.Publisher;

  public constructor(deps: DAOWatchPlayersUsecase.Deps) {
    this.playerDAO = deps.playerDAO;
    this.fetchPlayersPublisher = deps.fetchPlayersPublisher;
  }

  public async execute(
    callback: WatchPlayersUsecase.Callback,
  ): Promise<WatchPlayersUsecase.Response> {
    const unsubscribe = this.playerDAO.watch((dtos) => {
      const players = dtos.map(PlayerHydrator.hydrate);

      this.fetchPlayersPublisher.notifyFetchPlayers(players);

      callback(players);
    });

    return unsubscribe;
  }
}

export namespace DAOWatchPlayersUsecase {
  export type Deps = {
    playerDAO: PlayerDAO;
    fetchPlayersPublisher: FetchPlayersObserver.Publisher;
  };
}

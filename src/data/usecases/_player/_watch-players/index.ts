import { IWatchPlayersUsecase } from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { FetchPlayersObserver } from '@data/observers';

export class WatchPlayersUsecase implements IWatchPlayersUsecase {
  private readonly playerDAO: IPlayerDAO;
  private readonly fetchPlayersPublisher: FetchPlayersObserver.Publisher;

  public constructor({ playerDAO, fetchPlayersPublisher }: Deps) {
    this.playerDAO = playerDAO;
    this.fetchPlayersPublisher = fetchPlayersPublisher;
  }

  public async execute(
    callback: IWatchPlayersUsecase.Callback,
  ): Promise<IWatchPlayersUsecase.Response> {
    const unsubscribe = this.playerDAO.watch((dtos) => {
      const players = dtos.map(PlayerHydrator.hydrate);

      this.fetchPlayersPublisher.notifyFetchPlayers(players);

      callback(players);
    });

    return unsubscribe;
  }
}

type Deps = {
  playerDAO: IPlayerDAO;
  fetchPlayersPublisher: FetchPlayersObserver.Publisher;
};

import { FailedError } from '@domain/errors';
import { WatchPlayersUsecase } from '@domain/usecases';

import { PlayerDAO } from '@data/dao';
import { PlayerHydrator } from '@data/hydration';
import { FetchPlayersObserver } from '@data/observers';
import { SocketProtocol, TableGenerator } from '@data/protocols';

export class SocketWatchPlayersUsecase implements WatchPlayersUsecase {
  private readonly socket: SocketProtocol;
  private readonly tableGenerator: TableGenerator;
  private readonly fetchPlayersObserver: FetchPlayersObserver.Publisher;

  public constructor(deps: SocketWatchPlayersUsecase.Deps) {
    this.socket = deps.socket;
    this.tableGenerator = deps.tableGenerator;
    this.fetchPlayersObserver = deps.fetchPlayersObserver;
  }

  public async execute(
    callback: WatchPlayersUsecase.Callback,
  ): Promise<WatchPlayersUsecase.Response> {
    try {
      const table = await this.tableGenerator.getTable();

      const unsubscribe = this.socket.watch<PlayerDAO.DTO>(
        table,
        (snapshot) => {
          const players = snapshot.map(PlayerHydrator.hydrate);

          this.fetchPlayersObserver.notifyFetchPlayers(players);

          callback(players);
        },
      );

      return unsubscribe;
    } catch {
      throw new FailedError({ metadata: { tried: 'listen players changes' } });
    }
  }
}

export namespace SocketWatchPlayersUsecase {
  export type Deps = {
    socket: SocketProtocol;
    tableGenerator: TableGenerator;
    fetchPlayersObserver: FetchPlayersObserver.Publisher;
  };
}

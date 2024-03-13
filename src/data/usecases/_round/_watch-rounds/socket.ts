import { FailedError } from '@domain/errors';
import { WatchRoundsUsecase } from '@domain/usecases';

import { RoundDAO } from '@data/dao';
import { RoundHydrator } from '@data/hydration';
import { FetchRoundsObserver } from '@data/observers';
import { SocketProtocol, TableGenerator } from '@data/protocols';

export class SocketWatchRoundsUsecase implements WatchRoundsUsecase {
  private readonly socket: SocketProtocol;
  private readonly tableGenerator: TableGenerator;
  private readonly fetchRoundsPublisher: FetchRoundsObserver.Publisher;

  public constructor(deps: SocketWatchRoundsUsecase.Deps) {
    this.socket = deps.socket;
    this.tableGenerator = deps.tableGenerator;
    this.fetchRoundsPublisher = deps.fetchRoundsPublisher;
  }

  public async execute(
    callback: WatchRoundsUsecase.Callback,
  ): Promise<WatchRoundsUsecase.Response> {
    try {
      const table = await this.tableGenerator.getTable();

      const unsubscribe = this.socket.watch<RoundDAO.DTO>(table, (snapshot) => {
        const rounds = snapshot.map(RoundHydrator.hydrate);

        this.fetchRoundsPublisher.notifyFetchRounds(rounds);

        callback(rounds);
      });

      return unsubscribe;
    } catch {
      throw new FailedError({ metadata: { tried: 'listen rounds changes' } });
    }
  }
}

export namespace SocketWatchRoundsUsecase {
  export type Deps = {
    socket: SocketProtocol;
    tableGenerator: TableGenerator;
    fetchRoundsPublisher: FetchRoundsObserver.Publisher;
  };
}

import { FailedError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import { WatchPlayersUsecase } from '@domain/usecases';

import { SocketProtocol, TableGenerator } from '@data/protocols';

import { PlayerObserver } from '@data/observers';

import { PlayerCRUD } from '@data/cruds';

export class SocketWatchPlayersUsecase implements WatchPlayersUsecase {
  private readonly socket: SocketProtocol;
  private readonly tableGenerator: TableGenerator;
  private readonly playerPublisher: PlayerObserver.Publisher;

  public constructor(deps: SocketWatchPlayersUsecase.Deps) {
    this.socket = deps.socket;
    this.tableGenerator = deps.tableGenerator;
    this.playerPublisher = deps.playerPublisher;
  }

  public async execute(
    callback: WatchPlayersUsecase.Callback,
  ): Promise<WatchPlayersUsecase.Response> {
    try {
      const table = await this.tableGenerator.getTable();

      const unsubscribe = this.socket.watch<PlayerCRUD.DTO[]>(
        table,
        (snapshot) => {
          const players = snapshot.map(PlayerHydrator.hydrate);

          this.playerPublisher.notifyFetchPlayers(players);

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
    playerPublisher: PlayerObserver.Publisher;
  };
}

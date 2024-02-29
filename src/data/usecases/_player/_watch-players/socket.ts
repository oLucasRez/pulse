import { FailedError } from '@domain/errors';

import { PlayerHydrator } from '@data/hydration';

import { WatchPlayersUsecase } from '@domain/usecases';

import { SocketProtocol, TableGenerator } from '@data/protocols';

import { PlayerCRUD } from '@data/cruds';

export class SocketWatchPlayersUsecase implements WatchPlayersUsecase {
  private readonly socket: SocketProtocol;
  private readonly tableGenerator: TableGenerator;

  public constructor(deps: SocketWatchPlayersUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.socket = deps.socket;
  }

  public async execute(
    callback: WatchPlayersUsecase.Callback,
  ): Promise<WatchPlayersUsecase.Response> {
    try {
      const table = await this.tableGenerator.getTable();

      const unsubscribe = this.socket.watch<PlayerCRUD.DTO[]>(
        table,
        async (players) =>
          callback(await Promise.all(players.map(PlayerHydrator.hydrate))),
      );

      return unsubscribe;
    } catch {
      throw new FailedError({ metadata: { tried: 'listen players changes' } });
    }
  }
}

export namespace SocketWatchPlayersUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    socket: SocketProtocol;
  };
}

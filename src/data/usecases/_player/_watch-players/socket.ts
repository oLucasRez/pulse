import { PlayerModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { PlayerHydrator } from '@domain/hydration';

import { WatchPlayersUsecase } from '@domain/usecases';

import { SocketProtocol, TableGenerator } from '@data/protocols';

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

      const unsubscribe = this.socket.watch<PlayerModel.JSON[]>(
        table,
        (players) => callback(players.map(PlayerHydrator.hydrate)),
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

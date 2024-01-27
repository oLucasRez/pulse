import { FailedError } from '@domain/errors';

import { WatchPlayersUsecase } from '@domain/usecases';

import { SocketProtocol } from '@data/protocols';

export class SocketWatchPlayersUsecase implements WatchPlayersUsecase {
  private readonly table: string;
  private readonly socket: SocketProtocol;

  public constructor(deps: SocketWatchPlayersUsecase.Deps) {
    this.table = deps.table;
    this.socket = deps.socket;
  }

  public execute(
    callback: WatchPlayersUsecase.Callback,
  ): WatchPlayersUsecase.Response {
    try {
      const unsubscribe = this.socket.watch(this.table, callback);

      return unsubscribe;
    } catch {
      throw new FailedError('Failed to listen players changes');
    }
  }
}

export namespace SocketWatchPlayersUsecase {
  export type Deps = {
    table: string;
    socket: SocketProtocol;
  };
}

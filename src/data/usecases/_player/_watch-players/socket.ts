import { FailedError } from '@domain/errors';

import { WatchPlayersUsecase } from '@domain/usecases';

import { SocketProtocol } from '@data/protocols';

export class SocketWatchPlayersUsecase implements WatchPlayersUsecase {
  public constructor(
    private readonly table: string,
    private readonly socket: SocketProtocol,
  ) {}

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

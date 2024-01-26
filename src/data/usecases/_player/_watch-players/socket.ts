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
    const unsubscribe = this.socket.watch(this.table, callback);

    return unsubscribe;
  }
}

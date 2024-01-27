import { FailedError } from '@domain/errors';

import { WatchDicesUsecase } from '@domain/usecases';

import { SocketProtocol } from '@data/protocols';

export class SocketWatchDicesUsecase implements WatchDicesUsecase {
  private readonly table: string;
  private readonly socket: SocketProtocol;

  public constructor(deps: SocketWatchDicesUsecase.Deps) {
    this.table = deps.table;
    this.socket = deps.socket;
  }

  public execute(
    callback: WatchDicesUsecase.Callback,
  ): WatchDicesUsecase.Response {
    try {
      const unsubscribe = this.socket.watch(this.table, callback);

      return unsubscribe;
    } catch {
      throw new FailedError('Failed to listen dices changes');
    }
  }
}

export namespace SocketWatchDicesUsecase {
  export type Deps = {
    table: string;
    socket: SocketProtocol;
  };
}

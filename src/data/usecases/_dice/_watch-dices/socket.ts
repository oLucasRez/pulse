import { FailedError } from '@domain/errors';
import { WatchDicesUsecase } from '@domain/usecases';

import { DiceDAO } from '@data/dao';
import { DiceHydrator } from '@data/hydration';
import { SocketProtocol, TableGenerator } from '@data/protocols';

export class SocketWatchDicesUsecase implements WatchDicesUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly socket: SocketProtocol;

  public constructor(deps: SocketWatchDicesUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.socket = deps.socket;
  }

  public async execute(
    callback: WatchDicesUsecase.Callback,
  ): Promise<WatchDicesUsecase.Response> {
    try {
      const table = await this.tableGenerator.getTable();

      const unsubscribe = this.socket.watch<DiceDAO.DTO>(table, (dices) =>
        callback(dices.map(DiceHydrator.hydrate)),
      );

      return unsubscribe;
    } catch {
      throw new FailedError({ metadata: { tried: 'listen dices changes' } });
    }
  }
}

export namespace SocketWatchDicesUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    socket: SocketProtocol;
  };
}

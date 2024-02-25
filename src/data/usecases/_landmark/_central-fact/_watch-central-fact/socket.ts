import { CentralFactModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { CentralFactHydrator } from '@domain/hydration';

import { WatchCentralFactUsecase } from '@domain/usecases';

import { SocketProtocol, TableGenerator } from '@data/protocols';

export class SocketWatchCentralFactUsecase implements WatchCentralFactUsecase {
  private readonly tableGenerator: TableGenerator;
  private readonly socket: SocketProtocol;

  public constructor(deps: SocketWatchCentralFactUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.socket = deps.socket;
  }

  public async execute(
    callback: WatchCentralFactUsecase.Callback,
  ): Promise<WatchCentralFactUsecase.Response> {
    try {
      const table = await this.tableGenerator.getTable();

      const unsubscribe = this.socket.watch<CentralFactModel.JSON[]>(
        table,
        ([centralFact]) =>
          centralFact && callback(CentralFactHydrator.hydrate(centralFact)),
      );

      return unsubscribe;
    } catch {
      throw new FailedError({
        metadata: { tried: 'listen central-fact changes' },
      });
    }
  }
}

export namespace SocketWatchCentralFactUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    socket: SocketProtocol;
  };
}

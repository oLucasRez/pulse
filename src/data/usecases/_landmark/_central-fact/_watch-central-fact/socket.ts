import { CentralFactHydrator } from '@data/hydration';

import { WatchCentralFactUsecase } from '@domain/usecases';

import { SocketProtocol, TableGenerator } from '@data/protocols';

import { CentralFactCRUD } from '@data/cruds';

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
    const table = await this.tableGenerator.getTable();

    const unsubscribe = this.socket.watch<CentralFactCRUD.DTO[]>(
      table,
      ([centralFact]) =>
        centralFact && callback(CentralFactHydrator.hydrate(centralFact)),
    );

    return unsubscribe;
  }
}

export namespace SocketWatchCentralFactUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    socket: SocketProtocol;
  };
}

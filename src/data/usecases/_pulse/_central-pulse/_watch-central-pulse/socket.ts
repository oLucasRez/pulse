import { CentralPulseModel } from '@domain/models';

import { FailedError } from '@domain/errors';

import { CentralPulseHydrator } from '@domain/hydration';

import { WatchCentralPulseUsecase } from '@domain/usecases';

import { SocketProtocol, TableGenerator } from '@data/protocols';

export class SocketWatchCentralPulseUsecase
  implements WatchCentralPulseUsecase
{
  private readonly tableGenerator: TableGenerator;
  private readonly socket: SocketProtocol;

  public constructor(deps: SocketWatchCentralPulseUsecase.Deps) {
    this.tableGenerator = deps.tableGenerator;
    this.socket = deps.socket;
  }

  public async execute(
    callback: WatchCentralPulseUsecase.Callback,
  ): Promise<WatchCentralPulseUsecase.Response> {
    try {
      const table = await this.tableGenerator.getTable();

      const unsubscribe = this.socket.watch<CentralPulseModel.JSON[]>(
        table,
        ([centralPulse]) =>
          centralPulse && callback(CentralPulseHydrator.hydrate(centralPulse)),
      );

      return unsubscribe;
    } catch {
      throw new FailedError({
        metadata: { tried: 'listen central-pulse changes' },
      });
    }
  }
}

export namespace SocketWatchCentralPulseUsecase {
  export type Deps = {
    tableGenerator: TableGenerator;
    socket: SocketProtocol;
  };
}

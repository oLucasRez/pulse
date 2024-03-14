import { WatchCentralPulseUsecase } from '@domain/usecases';

import { CentralPulseDAO } from '@data/dao';
import { CentralPulseHydrator } from '@data/hydration';

export class DAOWatchCentralPulseUsecase implements WatchCentralPulseUsecase {
  private readonly centralPulseDAO: CentralPulseDAO;

  public constructor(deps: DAOWatchCentralPulseUsecase.Deps) {
    this.centralPulseDAO = deps.centralPulseDAO;
  }

  public async execute(
    callback: WatchCentralPulseUsecase.Callback,
  ): Promise<WatchCentralPulseUsecase.Response> {
    const unsubscribe = this.centralPulseDAO.watch(
      ([dto]) => dto && callback(CentralPulseHydrator.hydrate(dto)),
    );

    return unsubscribe;
  }
}

export namespace DAOWatchCentralPulseUsecase {
  export type Deps = {
    centralPulseDAO: CentralPulseDAO;
  };
}

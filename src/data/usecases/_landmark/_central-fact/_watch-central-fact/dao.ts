import { WatchCentralFactUsecase } from '@domain/usecases';

import { CentralFactDAO } from '@data/dao';
import { CentralFactHydrator } from '@data/hydration';

export class DAOWatchCentralFactUsecase implements WatchCentralFactUsecase {
  private readonly centralFactDAO: CentralFactDAO;

  public constructor(deps: DAOWatchCentralFactUsecase.Deps) {
    this.centralFactDAO = deps.centralFactDAO;
  }

  public async execute(
    callback: WatchCentralFactUsecase.Callback,
  ): Promise<WatchCentralFactUsecase.Response> {
    const unsubscribe = this.centralFactDAO.watch(
      ([dto]) => dto && callback(CentralFactHydrator.hydrate(dto)),
    );

    return unsubscribe;
  }
}

export namespace DAOWatchCentralFactUsecase {
  export type Deps = {
    centralFactDAO: CentralFactDAO;
  };
}

import { IWatchCentralPulseUsecase } from '@domain/usecases';

import { ICentralPulseDAO } from '@data/dao';
import { ICentralPulseHydrator } from '@data/hydration';

export class WatchCentralPulseUsecase implements IWatchCentralPulseUsecase {
  private readonly centralPulseDAO: ICentralPulseDAO;
  private readonly centralPulseHydrator: ICentralPulseHydrator;
  public constructor({ centralPulseDAO, centralPulseHydrator }: Deps) {
    this.centralPulseDAO = centralPulseDAO;
    this.centralPulseHydrator = centralPulseHydrator;
  }

  public async execute(
    callback: IWatchCentralPulseUsecase.Callback,
  ): Promise<IWatchCentralPulseUsecase.Response> {
    const unsubscribe = this.centralPulseDAO.watch(async ([dto]) => {
      const centralPulse = dto
        ? await this.centralPulseHydrator.hydrate(dto)
        : null;

      callback(centralPulse);
    });

    return unsubscribe;
  }
}

type Deps = {
  centralPulseDAO: ICentralPulseDAO;
  centralPulseHydrator: ICentralPulseHydrator;
};

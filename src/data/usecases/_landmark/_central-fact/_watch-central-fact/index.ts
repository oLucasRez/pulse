import { IWatchCentralFactUsecase } from '@domain/usecases';

import { ICentralFactDAO } from '@data/dao';
import { ICentralFactHydrator } from '@data/hydration';

export class WatchCentralFactUsecase implements IWatchCentralFactUsecase {
  private readonly centralFactDAO: ICentralFactDAO;
  private readonly centralFactHydrator: ICentralFactHydrator;
  public constructor({ centralFactDAO, centralFactHydrator }: Deps) {
    this.centralFactDAO = centralFactDAO;
    this.centralFactHydrator = centralFactHydrator;
  }

  public async execute(
    callback: IWatchCentralFactUsecase.Callback,
  ): Promise<IWatchCentralFactUsecase.Response> {
    return this.centralFactDAO.watch(async ([dto]) => {
      const centralFact = dto
        ? await this.centralFactHydrator.hydrate(dto)
        : null;

      callback(centralFact);
    });
  }
}

type Deps = {
  centralFactDAO: ICentralFactDAO;
  centralFactHydrator: ICentralFactHydrator;
};

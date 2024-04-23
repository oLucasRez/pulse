import { IWatchLightSpotsUsecase } from '@domain/usecases';

import { ILightSpotDAO } from '@data/dao';
import { ILightSpotHydrator } from '@data/hydration';

export class WatchLightSpotsUsecase implements IWatchLightSpotsUsecase {
  private readonly lightSpotDAO: ILightSpotDAO;
  private readonly lightSpotHydrator: ILightSpotHydrator;
  public constructor({ lightSpotDAO, lightSpotHydrator }: Deps) {
    this.lightSpotDAO = lightSpotDAO;
    this.lightSpotHydrator = lightSpotHydrator;
  }

  public async execute(
    callback: IWatchLightSpotsUsecase.Callback,
  ): Promise<IWatchLightSpotsUsecase.Response> {
    return this.lightSpotDAO.watch(async (dtos) => {
      const lightSpots = await Promise.all(
        dtos.map((dto) => this.lightSpotHydrator.hydrate(dto)),
      );

      callback(lightSpots);
    });
  }
}

type Deps = {
  lightSpotDAO: ILightSpotDAO;
  lightSpotHydrator: ILightSpotHydrator;
};

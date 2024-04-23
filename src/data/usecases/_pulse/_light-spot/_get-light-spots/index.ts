import { LightSpotModel } from '@domain/models';
import { IGetLightSpotsUsecase } from '@domain/usecases';

import { ILightSpotDAO } from '@data/dao';
import { ILightSpotHydrator } from '@data/hydration';

export class GetLightSpotsUsecase implements IGetLightSpotsUsecase {
  private readonly lightSpotDAO: ILightSpotDAO;
  private readonly lightSpotHydrator: ILightSpotHydrator;
  public constructor({ lightSpotDAO, lightSpotHydrator }: Deps) {
    this.lightSpotDAO = lightSpotDAO;
    this.lightSpotHydrator = lightSpotHydrator;
  }

  public async execute(): Promise<LightSpotModel[]> {
    const dtos = await this.lightSpotDAO.getAll();

    return Promise.all(dtos.map((dto) => this.lightSpotHydrator.hydrate(dto)));
  }
}

type Deps = {
  lightSpotDAO: ILightSpotDAO;
  lightSpotHydrator: ILightSpotHydrator;
};

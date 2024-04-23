import { NotFoundError } from '@domain/errors';
import { LightSpotModel } from '@domain/models';
import { ISetLightSpotLandmarkUsecase } from '@domain/usecases';

import { ILightSpotDAO } from '@data/dao';
import { ILightSpotHydrator } from '@data/hydration';

export class SetLightSpotLandmarkUsecase
  implements ISetLightSpotLandmarkUsecase
{
  private readonly lightSpotDAO: ILightSpotDAO;
  private readonly lightSpotHydrator: ILightSpotHydrator;
  public constructor({ lightSpotDAO, lightSpotHydrator }: Deps) {
    this.lightSpotDAO = lightSpotDAO;
    this.lightSpotHydrator = lightSpotHydrator;
  }

  public async execute(landmarkID: string): Promise<LightSpotModel> {
    const lightSpots = await this.lightSpotDAO.getAll();

    const lightSpotWithoutLandmark = lightSpots.find(
      ({ landmarkID }) => !landmarkID,
    );

    if (!lightSpotWithoutLandmark)
      throw new NotFoundError({
        metadata: { entity: 'LightSpot', prop: 'landmarkID', value: 'null' },
      });

    const dto = await this.lightSpotDAO.update(lightSpotWithoutLandmark.id, {
      landmarkID,
    });

    return this.lightSpotHydrator.hydrate(dto);
  }
}

type Deps = {
  lightSpotDAO: ILightSpotDAO;
  lightSpotHydrator: ILightSpotHydrator;
};

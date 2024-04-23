import { ForbiddenError } from '@domain/errors';
import { LightSpotModel } from '@domain/models';
import {
  ICreateLightSpotUsecase,
  IGetCurrentLightSpotDiceUsecase,
} from '@domain/usecases';

import { ILightSpotDAO } from '@data/dao';
import { ILightSpotHydrator } from '@data/hydration';

export class CreateLightSpotUsecase implements ICreateLightSpotUsecase {
  private readonly getCurrentLightSpotDice: IGetCurrentLightSpotDiceUsecase;
  private readonly lightSpotDAO: ILightSpotDAO;
  private readonly lightSpotHydrator: ILightSpotHydrator;
  public constructor({
    getCurrentLightSpotDice,
    lightSpotDAO,
    lightSpotHydrator,
  }: Deps) {
    this.getCurrentLightSpotDice = getCurrentLightSpotDice;
    this.lightSpotDAO = lightSpotDAO;
    this.lightSpotHydrator = lightSpotHydrator;
  }

  public async execute(): Promise<LightSpotModel> {
    const currentLightSpotDice = await this.getCurrentLightSpotDice.execute();

    const dicePosition = currentLightSpotDice?.position;

    if (!dicePosition)
      throw new ForbiddenError({
        metadata: { tried: 'create light-spot without positioning the dice' },
      });

    const dto = await this.lightSpotDAO.create({
      amount: 1,
      gap: dicePosition.mag(),
      origin: { x: 0, y: 0 },
      landmarkID: null,
    });

    return this.lightSpotHydrator.hydrate(dto);
  }
}

type Deps = {
  getCurrentLightSpotDice: IGetCurrentLightSpotDiceUsecase;
  lightSpotDAO: ILightSpotDAO;
  lightSpotHydrator: ILightSpotHydrator;
};

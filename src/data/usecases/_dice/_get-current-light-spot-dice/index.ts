import { DiceModel } from '@domain/models';
import {
  IGetCurrentLightSpotDiceUsecase,
  IGetLightSpotRoundUsecase,
} from '@domain/usecases';

import { IDiceDAO } from '@data/dao';
import { IDiceHydrator } from '@data/hydration';

export class GetCurrentLightSpotDiceUsecase
  implements IGetCurrentLightSpotDiceUsecase
{
  private readonly getLightSpotRound: IGetLightSpotRoundUsecase;
  private readonly diceDAO: IDiceDAO;
  private readonly diceHydrator: IDiceHydrator;
  public constructor({ getLightSpotRound, diceDAO, diceHydrator }: Deps) {
    this.getLightSpotRound = getLightSpotRound;
    this.diceDAO = diceDAO;
    this.diceHydrator = diceHydrator;
  }

  public async execute(): Promise<DiceModel | null> {
    const lightSpotRound = await this.getLightSpotRound.execute();

    if (!lightSpotRound) return null;
    if (lightSpotRound.i === null) return null;

    const dto = await this.diceDAO.getByOrder(lightSpotRound.i);

    return dto && this.diceHydrator.hydrate(dto);
  }
}

type Deps = {
  getLightSpotRound: IGetLightSpotRoundUsecase;
  diceDAO: IDiceDAO;
  diceHydrator: IDiceHydrator;
};

import { PlayerModel } from '@domain/models';
import {
  IGetCurrentLightSpotPlayerUsecase,
  IGetLightSpotRoundUsecase,
} from '@domain/usecases';

import { IPlayerDAO } from '@data/dao';
import { IPlayerHydrator } from '@data/hydration';

export class GetCurrentLightSpotPlayerUsecase
  implements IGetCurrentLightSpotPlayerUsecase
{
  private readonly getLightSpotRound: IGetLightSpotRoundUsecase;
  private readonly playerDAO: IPlayerDAO;
  private readonly playerHidrator: IPlayerHydrator;
  public constructor({ getLightSpotRound, playerDAO, playerHidrator }: Deps) {
    this.getLightSpotRound = getLightSpotRound;
    this.playerDAO = playerDAO;
    this.playerHidrator = playerHidrator;
  }

  public async execute(): Promise<PlayerModel | null> {
    const lightSpotRound = await this.getLightSpotRound.execute();

    if (!lightSpotRound) return null;
    if (lightSpotRound.i === null) return null;

    const dto = await this.playerDAO.getByOrder(lightSpotRound.i);

    return dto && this.playerHidrator.hydrate(dto);
  }
}

type Deps = {
  getLightSpotRound: IGetLightSpotRoundUsecase;
  playerDAO: IPlayerDAO;
  playerHidrator: IPlayerHydrator;
};

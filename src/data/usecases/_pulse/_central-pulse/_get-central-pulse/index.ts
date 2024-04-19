import { NotFoundError } from '@domain/errors';
import { CentralPulseModel } from '@domain/models';
import {
  IGetCentralPulseUsecase,
  IGetCurrentGameUsecase,
} from '@domain/usecases';

import { ICentralPulseDAO } from '@data/dao';
import { ICentralPulseHydrator } from '@data/hydration';

export class GetCentralPulseUsecase implements IGetCentralPulseUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly centralPulseDAO: ICentralPulseDAO;
  private readonly centralPulseHydrator: ICentralPulseHydrator;
  public constructor({
    getCurrentGame,
    centralPulseDAO,
    centralPulseHydrator,
  }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.centralPulseDAO = centralPulseDAO;
    this.centralPulseHydrator = centralPulseHydrator;
  }

  public async execute(): Promise<CentralPulseModel | null> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (!currentGame.centralPulseID) return null;

    const dto = await this.centralPulseDAO.getByID(currentGame.centralPulseID);

    const centralPulse = dto
      ? await this.centralPulseHydrator.hydrate(dto)
      : null;

    return centralPulse;
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  centralPulseDAO: ICentralPulseDAO;
  centralPulseHydrator: ICentralPulseHydrator;
};

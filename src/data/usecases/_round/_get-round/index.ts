import { NotFoundError } from '@domain/errors';
import { RoundModel } from '@domain/models';
import { IGetCurrentGameUsecase, IGetRoundUsecase } from '@domain/usecases';

import { IRoundDAO } from '@data/dao';
import { IRoundHydrator } from '@data/hydration';

export class GetRoundUsecase implements IGetRoundUsecase {
  private readonly getCurrentGame: IGetCurrentGameUsecase;
  private readonly roundDAO: IRoundDAO;
  private readonly roundHydrator: IRoundHydrator;
  public constructor({ getCurrentGame, roundDAO, roundHydrator }: Deps) {
    this.getCurrentGame = getCurrentGame;
    this.roundDAO = roundDAO;
    this.roundHydrator = roundHydrator;
  }

  public async execute(): Promise<RoundModel | null> {
    const currentGame = await this.getCurrentGame.execute();

    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });

    if (!currentGame.roundID) return null;

    const dto = await this.roundDAO.getByID(currentGame.roundID);

    return dto ? await this.roundHydrator.hydrate(dto) : null;
  }
}

type Deps = {
  getCurrentGame: IGetCurrentGameUsecase;
  roundDAO: IRoundDAO;
  roundHydrator: IRoundHydrator;
};

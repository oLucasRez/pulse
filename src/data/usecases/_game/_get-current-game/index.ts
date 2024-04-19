import { GameModel } from '@domain/models';
import { IGetCurrentGameUsecase, IGetMeUsecase } from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { IGameHydrator } from '@data/hydration';

export class GetCurrentGameUsecase implements IGetCurrentGameUsecase {
  private readonly getMe: IGetMeUsecase;
  private readonly gameDAO: IGameDAO;
  private readonly gameHydrator: IGameHydrator;
  public constructor({ getMe, gameDAO, gameHydrator }: Deps) {
    this.getMe = getMe;
    this.gameDAO = gameDAO;
    this.gameHydrator = gameHydrator;
  }

  public async execute(): Promise<GameModel | null> {
    const me = await this.getMe.execute();

    if (!me?.currentGameID) return null;

    const dto = await this.gameDAO.getByID(me.currentGameID);

    const game = dto ? await this.gameHydrator.hydrate(dto) : null;

    return game;
  }
}

type Deps = {
  getMe: IGetMeUsecase;
  gameDAO: IGameDAO;
  gameHydrator: IGameHydrator;
};

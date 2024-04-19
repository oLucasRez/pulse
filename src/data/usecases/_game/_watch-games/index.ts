import { ForbiddenError } from '@domain/errors';
import { IGetMeUsecase, IWatchGamesUsecase } from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { IGameHydrator } from '@data/hydration';

export class WatchGamesUsecase implements IWatchGamesUsecase {
  private readonly getMe: IGetMeUsecase;
  private readonly gameDAO: IGameDAO;
  private readonly gameHydrator: IGameHydrator;
  public constructor({ getMe, gameDAO, gameHydrator }: Deps) {
    this.getMe = getMe;
    this.gameDAO = gameDAO;
    this.gameHydrator = gameHydrator;
  }

  public async execute(
    callback: IWatchGamesUsecase.Callback,
  ): Promise<IWatchGamesUsecase.Response> {
    return this.gameDAO.watch(async (dtos) => {
      const me = await this.getMe.execute();
      if (!me)
        throw new ForbiddenError({
          metadata: { tried: 'watch current game without session' },
        });

      const games = await Promise.all(
        dtos
          .filter((dto) => dto.uid === me.uid || dto.id === me.currentGameID)
          .map((dto) => this.gameHydrator.hydrate(dto)),
      );

      callback(games);
    });
  }
}

type Deps = {
  getMe: IGetMeUsecase;
  gameDAO: IGameDAO;
  gameHydrator: IGameHydrator;
};

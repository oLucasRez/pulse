import { ForbiddenError } from '@domain/errors';
import { GameModel } from '@domain/models';
import { IGetGamesUsecase, IGetMeUsecase } from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { IGameHydrator } from '@data/hydration';

export class GetGamesUsecase implements IGetGamesUsecase {
  private readonly getMe: IGetMeUsecase;
  private readonly gameDAO: IGameDAO;
  private readonly gameHydrator: IGameHydrator;
  public constructor({ getMe, gameDAO, gameHydrator }: Deps) {
    this.getMe = getMe;
    this.gameDAO = gameDAO;
    this.gameHydrator = gameHydrator;
  }

  public async execute(): Promise<GameModel[]> {
    const me = await this.getMe.execute();
    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'get games without session' },
      });

    const dtos = (await this.gameDAO.getAll()).filter(
      (value) => value.uid === me.uid || value.id === me.currentGameID,
    );

    const games = await Promise.all(
      dtos.map((dto) => this.gameHydrator.hydrate(dto)),
    );

    return games;
  }
}

type Deps = {
  getMe: IGetMeUsecase;
  gameDAO: IGameDAO;
  gameHydrator: IGameHydrator;
};

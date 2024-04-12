import { ForbiddenError } from '@domain/errors';
import { GameModel } from '@domain/models';
import { IGetGamesUsecase, IGetMeUsecase } from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { FetchGamesObserver } from '@data/observers';

export class GetGamesUsecase implements IGetGamesUsecase {
  private readonly getMe: IGetMeUsecase;
  private readonly fetchGamesPublisher: FetchGamesObserver.Publisher;
  private readonly gameDAO: IGameDAO;

  public constructor({ getMe, fetchGamesPublisher, gameDAO }: Deps) {
    this.getMe = getMe;
    this.fetchGamesPublisher = fetchGamesPublisher;
    this.gameDAO = gameDAO;
  }

  public async execute(): Promise<GameModel[]> {
    const me = await this.getMe.execute();
    if (!me)
      throw new ForbiddenError({
        metadata: { tried: 'get games without session' },
      });

    const dto = (await this.gameDAO.getAll()).filter(
      (value) => value.uid === me.uid,
    );

    const games = dto.map(GameHydrator.hydrate);

    this.fetchGamesPublisher.notifyFetchGames(games);

    return games;
  }
}

type Deps = {
  getMe: IGetMeUsecase;
  fetchGamesPublisher: FetchGamesObserver.Publisher;
  gameDAO: IGameDAO;
};

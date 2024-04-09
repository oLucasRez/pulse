import { ForbiddenError } from '@domain/errors';
import { GameModel } from '@domain/models';
import { GetGamesUsecase, GetMeUsecase } from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { FetchGamesObserver } from '@data/observers';

export class DAOGetGamesUsecase implements GetGamesUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly fetchGamesPublisher: FetchGamesObserver.Publisher;
  private readonly gameDAO: IGameDAO;

  public constructor(deps: DAOGetGamesUsecase.Deps) {
    this.getMe = deps.getMe;
    this.fetchGamesPublisher = deps.fetchGamesPublisher;
    this.gameDAO = deps.gameDAO;
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

export namespace DAOGetGamesUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    fetchGamesPublisher: FetchGamesObserver.Publisher;
    gameDAO: IGameDAO;
  };
}

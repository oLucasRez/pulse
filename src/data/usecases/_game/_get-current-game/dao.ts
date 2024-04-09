import { GameModel } from '@domain/models';
import { GetCurrentGameUsecase, GetMeUsecase } from '@domain/usecases';

import { IGameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { FetchGameObserver } from '@data/observers';

export class DAOGetCurrentGameUsecase implements GetCurrentGameUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly fetchGamePublisher: FetchGameObserver.Publisher;
  private readonly gameDAO: IGameDAO;

  public constructor(deps: DAOGetCurrentGameUsecase.Deps) {
    this.getMe = deps.getMe;
    this.fetchGamePublisher = deps.fetchGamePublisher;
    this.gameDAO = deps.gameDAO;
  }

  public async execute(): Promise<GameModel | null> {
    const me = await this.getMe.execute();

    if (!me?.currentGameID) return null;

    const dto = await this.gameDAO.getByID(me.currentGameID);

    const game = dto ? GameHydrator.hydrate(dto) : null;

    this.fetchGamePublisher.notifyFetchGame(me.currentGameID, game);

    return game;
  }
}

export namespace DAOGetCurrentGameUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    fetchGamePublisher: FetchGameObserver.Publisher;
    gameDAO: IGameDAO;
  };
}

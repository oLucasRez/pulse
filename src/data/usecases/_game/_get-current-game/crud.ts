import { GameModel } from '@domain/models';
import { GetCurrentGameUsecase, GetMeUsecase } from '@domain/usecases';

import { GameDAO } from '@data/dao';
import { GameHydrator } from '@data/hydration';
import { FetchCurrentGameObserver } from '@data/observers';

export class DAOGetCurrentGameUsecase implements GetCurrentGameUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly fetchCurrentGamePublisher: FetchCurrentGameObserver.Publisher;
  private readonly gameDAO: GameDAO;

  public constructor(deps: DAOGetCurrentGameUsecase.Deps) {
    this.getMe = deps.getMe;
    this.fetchCurrentGamePublisher = deps.fetchCurrentGamePublisher;
    this.gameDAO = deps.gameDAO;
  }

  public async execute(): Promise<GameModel | null> {
    const me = await this.getMe.execute();

    if (!me?.currentGameID) return null;

    const dto = await this.gameDAO.read(me.currentGameID);

    const game = dto ? GameHydrator.hydrate(dto) : null;

    this.fetchCurrentGamePublisher.notifyFetchCurrentGame(game);

    return game;
  }
}

export namespace DAOGetCurrentGameUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    fetchCurrentGamePublisher: FetchCurrentGameObserver.Publisher;
    gameDAO: GameDAO;
  };
}

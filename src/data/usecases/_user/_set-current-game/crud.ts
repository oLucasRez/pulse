import { NotFoundError } from '@domain/errors';
import { UserModel } from '@domain/models';
import {
  GetGameUsecase,
  GetMeUsecase,
  SetCurrentGameUsecase,
} from '@domain/usecases';

import { UserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { ChangeMeObserver, FetchCurrentGameObserver } from '@data/observers';

export class DAOSetCurrentGameUsecase implements SetCurrentGameUsecase {
  private readonly getGame: GetGameUsecase;
  private readonly getMe: GetMeUsecase;
  private readonly changeMePublisher: ChangeMeObserver.Publisher;
  private readonly fetchCurrentGamePublisher: FetchCurrentGameObserver.Publisher;
  private readonly userDAO: UserDAO;

  public constructor(deps: DAOSetCurrentGameUsecase.Deps) {
    this.getGame = deps.getGame;
    this.getMe = deps.getMe;
    this.changeMePublisher = deps.changeMePublisher;
    this.fetchCurrentGamePublisher = deps.fetchCurrentGamePublisher;
    this.userDAO = deps.userDAO;
  }

  public async execute(gameID: string | null): Promise<UserModel> {
    const me = await this.getMe.execute();
    if (!me) throw new NotFoundError({ metadata: { entity: 'Me' } });

    if (gameID) {
      const game = await this.getGame.execute(gameID);
      if (!game)
        throw new NotFoundError({
          metadata: { entity: 'Game', prop: 'id', value: gameID },
        });

      this.fetchCurrentGamePublisher.notifyFetchCurrentGame(game);
    } else this.fetchCurrentGamePublisher.notifyFetchCurrentGame(null);

    const dto = await this.userDAO.update(me.uid, {
      currentGameID: gameID,
    });

    const user = UserHydrator.hydrate(dto);

    this.changeMePublisher.notifyChangeMe(user);

    return user;
  }
}

export namespace DAOSetCurrentGameUsecase {
  export type Deps = {
    getGame: GetGameUsecase;
    getMe: GetMeUsecase;
    changeMePublisher: ChangeMeObserver.Publisher;
    fetchCurrentGamePublisher: FetchCurrentGameObserver.Publisher;
    userDAO: UserDAO;
  };
}

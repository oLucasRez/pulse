import { NotFoundError } from '@domain/errors';
import { UserModel } from '@domain/models';
import {
  GetGameUsecase,
  GetMeUsecase,
  SetCurrentGameUsecase,
} from '@domain/usecases';

import { UserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { ChangeCurrentGameObserver } from '@data/observers';

export class DAOSetCurrentGameUsecase implements SetCurrentGameUsecase {
  private readonly getGame: GetGameUsecase;
  private readonly getMe: GetMeUsecase;
  private readonly changeCurrentGamePublisher: ChangeCurrentGameObserver.Publisher;
  private readonly userDAO: UserDAO;

  public constructor(deps: DAOSetCurrentGameUsecase.Deps) {
    this.getGame = deps.getGame;
    this.getMe = deps.getMe;
    this.changeCurrentGamePublisher = deps.changeCurrentGamePublisher;
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

      this.changeCurrentGamePublisher.notifyChangeCurrentGame(game);
    } else this.changeCurrentGamePublisher.notifyChangeCurrentGame(null);

    const dto = await this.userDAO.update(me.uid, {
      currentGameID: gameID,
    });

    const user = UserHydrator.hydrate(dto);

    return user;
  }
}

export namespace DAOSetCurrentGameUsecase {
  export type Deps = {
    getGame: GetGameUsecase;
    getMe: GetMeUsecase;
    changeCurrentGamePublisher: ChangeCurrentGameObserver.Publisher;
    userDAO: UserDAO;
  };
}

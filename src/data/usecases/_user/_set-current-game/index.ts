import { NotFoundError } from '@domain/errors';
import { UserModel } from '@domain/models';
import {
  IGetGameUsecase,
  IGetMeUsecase,
  ISetCurrentGameUsecase,
} from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { ChangeCurrentGameObserver } from '@data/observers';

export class SetCurrentGameUsecase implements ISetCurrentGameUsecase {
  private readonly getGame: IGetGameUsecase;
  private readonly getMe: IGetMeUsecase;
  private readonly changeCurrentGamePublisher: ChangeCurrentGameObserver.Publisher;
  private readonly userDAO: IUserDAO;

  public constructor({
    getGame,
    getMe,
    changeCurrentGamePublisher,
    userDAO,
  }: Deps) {
    this.getGame = getGame;
    this.getMe = getMe;
    this.changeCurrentGamePublisher = changeCurrentGamePublisher;
    this.userDAO = userDAO;
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

type Deps = {
  getGame: IGetGameUsecase;
  getMe: IGetMeUsecase;
  changeCurrentGamePublisher: ChangeCurrentGameObserver.Publisher;
  userDAO: IUserDAO;
};

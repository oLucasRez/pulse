import { NotFoundError } from '@domain/errors';
import { UserModel } from '@domain/models';
import {
  IGetGameUsecase,
  IGetMeUsecase,
  ISetCurrentGameUsecase,
} from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { IUserHydrator } from '@data/hydration';

export class SetCurrentGameUsecase implements ISetCurrentGameUsecase {
  private readonly getGame: IGetGameUsecase;
  private readonly getMe: IGetMeUsecase;
  private readonly userDAO: IUserDAO;
  private readonly userHydrator: IUserHydrator;
  public constructor({ getGame, getMe, userDAO, userHydrator }: Deps) {
    this.getGame = getGame;
    this.getMe = getMe;
    this.userDAO = userDAO;
    this.userHydrator = userHydrator;
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
    }

    const dto = await this.userDAO.update(me.uid, {
      currentGameID: gameID,
    });

    const user = await this.userHydrator.hydrate(dto);

    return user;
  }
}

type Deps = {
  getGame: IGetGameUsecase;
  getMe: IGetMeUsecase;
  userDAO: IUserDAO;
  userHydrator: IUserHydrator;
};

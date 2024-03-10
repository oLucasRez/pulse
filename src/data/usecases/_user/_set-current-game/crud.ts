import { UserModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { UserHydrator } from '@data/hydration';

import {
  GetGameUsecase,
  GetMeUsecase,
  SetCurrentGameUsecase,
} from '@domain/usecases';

import { ChangeMeObserver, GameObserver } from '@data/observers';

import { UserCRUD } from '@data/cruds';

export class CRUDSetCurrentGameUsecase implements SetCurrentGameUsecase {
  private readonly getGame: GetGameUsecase;
  private readonly getMe: GetMeUsecase;
  private readonly changeMePublisher: ChangeMeObserver.Publisher;
  private readonly gamePublisher: GameObserver.Publisher;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: CRUDSetCurrentGameUsecase.Deps) {
    this.getGame = deps.getGame;
    this.getMe = deps.getMe;
    this.changeMePublisher = deps.changeMePublisher;
    this.gamePublisher = deps.gamePublisher;
    this.userCRUD = deps.userCRUD;
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

      this.gamePublisher.notifyFetchCurrentGame(game);
    } else this.gamePublisher.notifyFetchCurrentGame(null);

    const dto = await this.userCRUD.update(me.uid, {
      currentGameID: gameID,
    });

    const user = UserHydrator.hydrate(dto);

    this.changeMePublisher.notifyChangeMe(user);

    return user;
  }
}

export namespace CRUDSetCurrentGameUsecase {
  export type Deps = {
    getGame: GetGameUsecase;
    getMe: GetMeUsecase;
    changeMePublisher: ChangeMeObserver.Publisher;
    gamePublisher: GameObserver.Publisher;
    userCRUD: UserCRUD;
  };
}

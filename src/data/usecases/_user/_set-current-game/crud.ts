import { UserModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { UserHydrator } from '@data/hydration';

import {
  GetGameUsecase,
  GetMeUsecase,
  SetCurrentGameUsecase,
} from '@domain/usecases';

import { AuthObserver } from '@data/observers';

import { UserCRUD } from '@data/cruds';

export class CRUDSetCurrentGameUsecase implements SetCurrentGameUsecase {
  private readonly getGame: GetGameUsecase;
  private readonly getMe: GetMeUsecase;
  private readonly authPublisher: AuthObserver.Publisher;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: CRUDSetCurrentGameUsecase.Deps) {
    this.getGame = deps.getGame;
    this.getMe = deps.getMe;
    this.authPublisher = deps.authPublisher;
    this.userCRUD = deps.userCRUD;
  }

  public async execute(gameID: string): Promise<UserModel> {
    const me = await this.getMe.execute();
    if (!me) throw new NotFoundError({ metadata: { entity: 'Me' } });

    const game = await this.getGame.execute(gameID);
    if (!game)
      throw new NotFoundError({
        metadata: { entity: 'Game', prop: 'id', value: gameID },
      });

    const dto = await this.userCRUD.update(me.uid, {
      currentGameID: game.id,
    });

    const user = UserHydrator.hydrate(dto);

    this.authPublisher.notifyChangeMe(user);

    return user;
  }
}

export namespace CRUDSetCurrentGameUsecase {
  export type Deps = {
    getGame: GetGameUsecase;
    getMe: GetMeUsecase;
    authPublisher: AuthObserver.Publisher;
    userCRUD: UserCRUD;
  };
}

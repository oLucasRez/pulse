import { UserModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { UserHydrator } from '@data/hydration';

import { GetMeUsecase, SetCurrentGameUsecase } from '@domain/usecases';

import { AuthObserver } from '@data/observers';

import { UserCRUD } from '@data/cruds';

export class CRUDSetCurrentGameUsecase implements SetCurrentGameUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly authPublisher: AuthObserver.Publisher;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: CRUDSetCurrentGameUsecase.Deps) {
    this.getMe = deps.getMe;
    this.authPublisher = deps.authPublisher;
    this.userCRUD = deps.userCRUD;
  }

  public async execute(gameID: string): Promise<UserModel> {
    const me = await this.getMe.execute();
    if (!me) throw new NotFoundError({ metadata: { entity: 'Me' } });

    const dto = await this.userCRUD.update(me.uid, {
      currentGameID: gameID,
    });

    const user = UserHydrator.hydrate(dto);

    this.authPublisher.notifyMeChange(user);

    return user;
  }
}

export namespace CRUDSetCurrentGameUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    authPublisher: AuthObserver.Publisher;
    userCRUD: UserCRUD;
  };
}

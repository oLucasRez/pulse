import { UserModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { UserHydrator } from '@data/hydration';

import { GetMeUsecase, SetCurrentGameUsecase } from '@domain/usecases';

import { UserCRUD } from '@data/cruds';

export class SetCurrentGame implements SetCurrentGameUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: SetCurrentGame.Deps) {
    this.getMe = deps.getMe;
    this.userCRUD = deps.userCRUD;
  }

  public async execute(gameID: string): Promise<UserModel> {
    const me = await this.getMe.execute();
    if (!me) throw new NotFoundError({ metadata: { entity: 'Me' } });

    const userDTO = await this.userCRUD.update(me.uid, {
      currentGameID: gameID,
    });

    return UserHydrator.hydrate(userDTO);
  }
}

export namespace SetCurrentGame {
  export type Deps = {
    getMe: GetMeUsecase;
    userCRUD: UserCRUD;
  };
}

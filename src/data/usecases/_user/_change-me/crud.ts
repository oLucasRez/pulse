import { UserModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { UserHydrator } from '@data/hydration';

import { ChangeMeUsecase, GetMeUsecase } from '@domain/usecases';

import { AuthObserver } from '@data/observers';

import { UserCRUD } from '@data/cruds';

export class CRUDChangeMeUsecase implements ChangeMeUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly authPublisher: AuthObserver.Publisher;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: CRUDChangeMeUsecase.Deps) {
    this.getMe = deps.getMe;
    this.authPublisher = deps.authPublisher;
    this.userCRUD = deps.userCRUD;
  }

  public async execute(payload: ChangeMeUsecase.Payload): Promise<UserModel> {
    const { name } = payload;

    let user = await this.getMe.execute();
    if (!user) throw new NotFoundError({ metadata: { entity: 'User' } });

    const userDTO = await this.userCRUD.update(user.id, {
      name,
    });

    user = UserHydrator.hydrate(userDTO);

    this.authPublisher.notifyMeChange(user);

    return user;
  }
}

export namespace CRUDChangeMeUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    authPublisher: AuthObserver.Publisher;
    userCRUD: UserCRUD;
  };
}

import { UserModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { UserHydrator } from '@data/hydration';

import { ChangeMeUsecase, GetMeUsecase } from '@domain/usecases';

import { UserCRUD } from '@data/cruds';

export class ChangeMe implements ChangeMeUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: ChangeMe.Deps) {
    this.getMe = deps.getMe;
    this.userCRUD = deps.userCRUD;
  }

  public async execute(payload: ChangeMeUsecase.Payload): Promise<UserModel> {
    const { name } = payload;

    const user = await this.getMe.execute();
    if (!user) throw new NotFoundError({ metadata: { entity: 'User' } });

    const dto = await this.userCRUD.update(user.id, {
      name,
    });

    return UserHydrator.hydrate(dto);
  }
}

export namespace ChangeMe {
  export type Deps = {
    getMe: GetMeUsecase;
    userCRUD: UserCRUD;
  };
}

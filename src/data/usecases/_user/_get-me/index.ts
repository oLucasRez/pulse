import { UserModel } from '@domain/models';

import { UserHydrator } from '@data/hydration';

import { GetMeUsecase } from '@domain/usecases';

import { SessionGetterProtocol } from '@data/protocols';

import { UserCRUD } from '@data/cruds';

export class GetMe implements GetMeUsecase {
  private readonly sessionGetter: SessionGetterProtocol;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: GetMe.Deps) {
    this.sessionGetter = deps.sessionGetter;
    this.userCRUD = deps.userCRUD;
  }

  public async execute(): Promise<UserModel | null> {
    const { uid, isAnonymous, providers } =
      await this.sessionGetter.getSession();

    if (!uid) return null;

    const dto = await this.userCRUD.read(uid);

    if (dto) {
      dto.isAnonymous = isAnonymous;
      dto.providers = providers;
    }

    return dto ? UserHydrator.hydrate(dto) : null;
  }
}

export namespace GetMe {
  export type Deps = {
    sessionGetter: SessionGetterProtocol;
    userCRUD: UserCRUD;
  };
}

import { UserModel } from '@domain/models';

import { UserHydrator } from '@data/hydration';

import { GetMeUsecase } from '@domain/usecases';

import { SessionGetterProtocol } from '@data/protocols';

import { FetchMeObserver } from '@data/observers';

import { UserCRUD } from '@data/cruds';

export class CRUDGetMeUsecase implements GetMeUsecase {
  private readonly sessionGetter: SessionGetterProtocol;
  private readonly fetchMePublisher: FetchMeObserver.Publisher;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: CRUDGetMeUsecase.Deps) {
    this.sessionGetter = deps.sessionGetter;
    this.fetchMePublisher = deps.fetchMePublisher;
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

    const user = dto ? UserHydrator.hydrate(dto) : null;

    this.fetchMePublisher.notifyFetchMe(user);

    return user;
  }
}

export namespace CRUDGetMeUsecase {
  export type Deps = {
    sessionGetter: SessionGetterProtocol;
    fetchMePublisher: FetchMeObserver.Publisher;
    userCRUD: UserCRUD;
  };
}

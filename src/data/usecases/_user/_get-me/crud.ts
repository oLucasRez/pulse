import { UserModel } from '@domain/models';
import { GetMeUsecase } from '@domain/usecases';

import { UserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { FetchMeObserver } from '@data/observers';
import { SessionGetterProtocol } from '@data/protocols';

export class DAOGetMeUsecase implements GetMeUsecase {
  private readonly sessionGetter: SessionGetterProtocol;
  private readonly fetchMePublisher: FetchMeObserver.Publisher;
  private readonly userDAO: UserDAO;

  public constructor(deps: DAOGetMeUsecase.Deps) {
    this.sessionGetter = deps.sessionGetter;
    this.fetchMePublisher = deps.fetchMePublisher;
    this.userDAO = deps.userDAO;
  }

  public async execute(): Promise<UserModel | null> {
    const { uid, isAnonymous, providers } =
      await this.sessionGetter.getSession();

    if (!uid) return null;

    const dto = await this.userDAO.read(uid);

    if (dto) {
      dto.isAnonymous = isAnonymous;
      dto.providers = providers;
    }

    const user = dto ? UserHydrator.hydrate(dto) : null;

    this.fetchMePublisher.notifyFetchMe(user);

    return user;
  }
}

export namespace DAOGetMeUsecase {
  export type Deps = {
    sessionGetter: SessionGetterProtocol;
    fetchMePublisher: FetchMeObserver.Publisher;
    userDAO: UserDAO;
  };
}

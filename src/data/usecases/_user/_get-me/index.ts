import { UserModel } from '@domain/models';
import { IGetMeUsecase } from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { FetchMeObserver } from '@data/observers';
import { SessionGetterProtocol } from '@data/protocols';

export class GetMeUsecase implements IGetMeUsecase {
  private readonly sessionGetter: SessionGetterProtocol;
  private readonly fetchMePublisher: FetchMeObserver.Publisher;
  private readonly userDAO: IUserDAO;

  public constructor({ sessionGetter, fetchMePublisher, userDAO }: Deps) {
    this.sessionGetter = sessionGetter;
    this.fetchMePublisher = fetchMePublisher;
    this.userDAO = userDAO;
  }

  public async execute(): Promise<UserModel | null> {
    const { uid, isAnonymous, providers } =
      await this.sessionGetter.getSession();

    if (!uid) return null;

    const dto = await this.userDAO.getByUID(uid);

    if (dto) {
      dto.isAnonymous = isAnonymous;
      dto.providers = providers;
    }

    const user = dto ? UserHydrator.hydrate(dto) : null;

    this.fetchMePublisher.notifyFetchMe(user);

    return user;
  }
}

type Deps = {
  sessionGetter: SessionGetterProtocol;
  fetchMePublisher: FetchMeObserver.Publisher;
  userDAO: IUserDAO;
};

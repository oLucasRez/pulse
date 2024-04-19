import { UserModel } from '@domain/models';
import { IGetMeUsecase } from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { IUserHydrator } from '@data/hydration';
import { SessionGetterProtocol } from '@data/protocols';

export class GetMeUsecase implements IGetMeUsecase {
  private readonly sessionGetter: SessionGetterProtocol;
  private readonly userDAO: IUserDAO;
  private readonly userHydrator: IUserHydrator;
  public constructor({ sessionGetter, userDAO, userHydrator }: Deps) {
    this.sessionGetter = sessionGetter;
    this.userDAO = userDAO;
    this.userHydrator = userHydrator;
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

    const user = dto ? await this.userHydrator.hydrate(dto) : null;

    return user;
  }
}

type Deps = {
  sessionGetter: SessionGetterProtocol;
  userDAO: IUserDAO;
  userHydrator: IUserHydrator;
};

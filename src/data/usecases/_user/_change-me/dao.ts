import { NotFoundError } from '@domain/errors';
import { UserModel } from '@domain/models';
import { ChangeMeUsecase, GetMeUsecase } from '@domain/usecases';

import { UserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { ChangeMeObserver } from '@data/observers';

export class DAOChangeMeUsecase implements ChangeMeUsecase {
  private readonly getMe: GetMeUsecase;
  private readonly changeMePublisher: ChangeMeObserver.Publisher;
  private readonly userDAO: UserDAO;

  public constructor(deps: DAOChangeMeUsecase.Deps) {
    this.getMe = deps.getMe;
    this.changeMePublisher = deps.changeMePublisher;
    this.userDAO = deps.userDAO;
  }

  public async execute(payload: ChangeMeUsecase.Payload): Promise<UserModel> {
    const { name } = payload;

    let user = await this.getMe.execute();
    if (!user) throw new NotFoundError({ metadata: { entity: 'User' } });

    const userDTO = await this.userDAO.update(user.id, {
      name,
    });

    user = UserHydrator.hydrate(userDTO);

    this.changeMePublisher.notifyChangeMe(user);

    return user;
  }
}

export namespace DAOChangeMeUsecase {
  export type Deps = {
    getMe: GetMeUsecase;
    changeMePublisher: ChangeMeObserver.Publisher;
    userDAO: UserDAO;
  };
}

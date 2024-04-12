import { NotFoundError } from '@domain/errors';
import { UserModel } from '@domain/models';
import { IChangeMeUsecase, IGetMeUsecase } from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { ChangeMeObserver } from '@data/observers';

export class ChangeMeUsecase implements IChangeMeUsecase {
  private readonly getMe: IGetMeUsecase;
  private readonly changeMePublisher: ChangeMeObserver.Publisher;
  private readonly userDAO: IUserDAO;

  public constructor({ getMe, changeMePublisher, userDAO }: Deps) {
    this.getMe = getMe;
    this.changeMePublisher = changeMePublisher;
    this.userDAO = userDAO;
  }

  public async execute(payload: IChangeMeUsecase.Payload): Promise<UserModel> {
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

type Deps = {
  getMe: IGetMeUsecase;
  changeMePublisher: ChangeMeObserver.Publisher;
  userDAO: IUserDAO;
};

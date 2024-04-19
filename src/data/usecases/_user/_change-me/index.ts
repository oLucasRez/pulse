import { NotFoundError } from '@domain/errors';
import { UserModel } from '@domain/models';
import { IChangeMeUsecase, IGetMeUsecase } from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { IUserHydrator } from '@data/hydration';

export class ChangeMeUsecase implements IChangeMeUsecase {
  private readonly getMe: IGetMeUsecase;
  private readonly userDAO: IUserDAO;
  private readonly userHydrator: IUserHydrator;
  public constructor({ getMe, userDAO, userHydrator }: Deps) {
    this.getMe = getMe;
    this.userDAO = userDAO;
    this.userHydrator = userHydrator;
  }

  public async execute(payload: IChangeMeUsecase.Payload): Promise<UserModel> {
    const { name } = payload;

    let user = await this.getMe.execute();
    if (!user) throw new NotFoundError({ metadata: { entity: 'User' } });

    const userDTO = await this.userDAO.update(user.id, {
      name,
    });

    user = await this.userHydrator.hydrate(userDTO);

    return user;
  }
}

type Deps = {
  getMe: IGetMeUsecase;
  userDAO: IUserDAO;
  userHydrator: IUserHydrator;
};

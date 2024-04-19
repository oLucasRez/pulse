import { faker } from '@faker-js/faker';

import { NotFoundError } from '@domain/errors';
import { UserModel } from '@domain/models';
import { ISignInAnonymouslyUsecase } from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { IUserHydrator } from '@data/hydration';
import { AuthAnonymousProtocol } from '@data/protocols';

export class SignInAnonymouslyUsecase implements ISignInAnonymouslyUsecase {
  private readonly userDAO: IUserDAO;
  private readonly userHydrator: IUserHydrator;
  private readonly authAnonymous: AuthAnonymousProtocol;
  public constructor({ userDAO, userHydrator, authAnonymous }: Deps) {
    this.userDAO = userDAO;
    this.userHydrator = userHydrator;
    this.authAnonymous = authAnonymous;
  }

  public async execute(): Promise<UserModel> {
    const uid = await this.authAnonymous.signInAnonymously();

    let dto = await this.userDAO.getByUID(uid);

    if (!dto) {
      dto = await this.userDAO.create({
        uid,
        name: faker.person.fullName(),
        currentGameID: null,
        // useless
        isAnonymous: true,
        providers: [],
      });
    }

    if (!dto)
      throw new NotFoundError({
        metadata: { entity: 'User', prop: 'uid', value: uid },
      });

    const user = await this.userHydrator.hydrate(dto);

    return user;
  }
}

type Deps = {
  userDAO: IUserDAO;
  userHydrator: IUserHydrator;
  authAnonymous: AuthAnonymousProtocol;
};

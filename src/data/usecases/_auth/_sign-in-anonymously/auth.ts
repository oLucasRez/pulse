import { faker } from '@faker-js/faker';

import { NotFoundError } from '@domain/errors';
import { UserModel } from '@domain/models';
import { SignInAnonymouslyUsecase } from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { SignInObserver } from '@data/observers';
import { AuthAnonymousProtocol } from '@data/protocols';

export class AuthSignInAnonymouslyUsecase implements SignInAnonymouslyUsecase {
  private readonly authAnonymous: AuthAnonymousProtocol;
  private readonly signInPublisher: SignInObserver.Publisher;
  private readonly userDAO: IUserDAO;

  public constructor(deps: AuthSignInAnonymouslyUsecase.Deps) {
    this.signInPublisher = deps.signInPublisher;
    this.authAnonymous = deps.authAnonymous;
    this.userDAO = deps.userDAO;
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

    const user = UserHydrator.hydrate(dto);

    this.signInPublisher.notifySignIn(user);

    return user;
  }
}

export namespace AuthSignInAnonymouslyUsecase {
  export type Deps = {
    signInPublisher: SignInObserver.Publisher;
    authAnonymous: AuthAnonymousProtocol;
    userDAO: IUserDAO;
  };
}

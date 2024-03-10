import { faker } from '@faker-js/faker';

import { UserModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { UserHydrator } from '@data/hydration';

import { SignInAnonymouslyUsecase } from '@domain/usecases';

import { AuthAnonymousProtocol } from '@data/protocols';

import { SignInObserver } from '@data/observers';

import { UserCRUD } from '@data/cruds';

export class AuthSignInAnonymouslyUsecase implements SignInAnonymouslyUsecase {
  private readonly authAnonymous: AuthAnonymousProtocol;
  private readonly signInPublisher: SignInObserver.Publisher;
  private readonly userCRUD: UserCRUD;

  public constructor(deps: AuthSignInAnonymouslyUsecase.Deps) {
    this.signInPublisher = deps.signInPublisher;
    this.authAnonymous = deps.authAnonymous;
    this.userCRUD = deps.userCRUD;
  }

  public async execute(): Promise<UserModel> {
    const uid = await this.authAnonymous.signInAnonymously();

    let userDTO = await this.userCRUD.read(uid);

    if (!userDTO) {
      userDTO = await this.userCRUD.create({
        uid,
        name: faker.person.fullName(),
        currentGameID: null,
        // useless
        isAnonymous: true,
        providers: [],
      });
    }

    if (!userDTO)
      throw new NotFoundError({
        metadata: { entity: 'User', prop: 'uid', value: uid },
      });

    const user = UserHydrator.hydrate(userDTO);

    this.signInPublisher.notifySignIn(user);

    return user;
  }
}

export namespace AuthSignInAnonymouslyUsecase {
  export type Deps = {
    signInPublisher: SignInObserver.Publisher;
    authAnonymous: AuthAnonymousProtocol;
    userCRUD: UserCRUD;
  };
}

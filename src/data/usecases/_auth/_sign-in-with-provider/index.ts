import { UserModel } from '@domain/models';
import { Provider } from '@domain/types';
import { IChangeMeUsecase, ISignInWithProviderUsecase } from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { UserHydrator } from '@data/hydration';
import { SignInObserver } from '@data/observers';
import { AuthProviderProtocol } from '@data/protocols';
import { dontThrow } from '@data/utils';

export class SignInWithProviderUsecase implements ISignInWithProviderUsecase {
  private readonly changeMe: IChangeMeUsecase;
  private readonly authProvider: AuthProviderProtocol;
  private readonly signInPublisher: SignInObserver.Publisher;
  private readonly userDAO: IUserDAO;

  public constructor({
    changeMe,
    authProvider,
    signInPublisher,
    userDAO,
  }: Deps) {
    this.changeMe = changeMe;
    this.authProvider = authProvider;
    this.signInPublisher = signInPublisher;
    this.userDAO = userDAO;
  }

  public async execute(provider: Provider): Promise<UserModel> {
    const { uid, name } = await this.authProvider.signInWith(provider);

    let dto = await this.userDAO.getByUID(uid);

    if (dto) {
      await dontThrow(async () => {
        if (dto && name && name !== dto.name)
          await this.changeMe.execute({ name });
      });
    } else {
      dto = await this.userDAO.create({
        uid,
        name: name ?? '',
        currentGameID: null,
        // useless
        isAnonymous: false,
        providers: [],
      });
    }

    const user = UserHydrator.hydrate(dto);

    this.signInPublisher.notifySignIn(user);

    return user;
  }
}

type Deps = {
  changeMe: IChangeMeUsecase;
  authProvider: AuthProviderProtocol;
  signInPublisher: SignInObserver.Publisher;
  userDAO: IUserDAO;
};

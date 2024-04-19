import { UserModel } from '@domain/models';
import { Provider } from '@domain/types';
import { IChangeMeUsecase, ISignInWithProviderUsecase } from '@domain/usecases';

import { IUserDAO } from '@data/dao';
import { IUserHydrator } from '@data/hydration';
import { AuthProviderProtocol } from '@data/protocols';
import { dontThrow } from '@data/utils';

export class SignInWithProviderUsecase implements ISignInWithProviderUsecase {
  private readonly changeMe: IChangeMeUsecase;
  private readonly authProvider: AuthProviderProtocol;
  private readonly userDAO: IUserDAO;
  private readonly userHydrator: IUserHydrator;
  public constructor({ changeMe, authProvider, userDAO, userHydrator }: Deps) {
    this.changeMe = changeMe;
    this.authProvider = authProvider;
    this.userDAO = userDAO;
    this.userHydrator = userHydrator;
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

    const user = await this.userHydrator.hydrate(dto);

    return user;
  }
}

type Deps = {
  changeMe: IChangeMeUsecase;
  authProvider: AuthProviderProtocol;
  userDAO: IUserDAO;
  userHydrator: IUserHydrator;
};

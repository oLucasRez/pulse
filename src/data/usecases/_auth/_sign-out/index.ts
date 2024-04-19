import { ISignOutUsecase } from '@domain/usecases';

import { SessionDestroyerProtocol } from '@data/protocols';

export class SignOutUsecase implements ISignOutUsecase {
  private readonly sessionDestroyer: SessionDestroyerProtocol;
  public constructor({ sessionDestroyer }: Deps) {
    this.sessionDestroyer = sessionDestroyer;
  }

  public async execute(): Promise<void> {
    await this.sessionDestroyer.destroySession();
  }
}

type Deps = {
  sessionDestroyer: SessionDestroyerProtocol;
};

import { SignOutUsecase } from '@domain/usecases';

import { SessionDestroyerProtocol } from '@data/protocols';

export class AuthSignOutUsecase implements SignOutUsecase {
  private readonly sessionDestroyer: SessionDestroyerProtocol;

  public constructor(deps: AuthSignOutUsecase.Deps) {
    this.sessionDestroyer = deps.sessionDestroyer;
  }

  public async execute(): Promise<void> {
    await this.sessionDestroyer.destroySession();
  }
}

export namespace AuthSignOutUsecase {
  export type Deps = {
    sessionDestroyer: SessionDestroyerProtocol;
  };
}

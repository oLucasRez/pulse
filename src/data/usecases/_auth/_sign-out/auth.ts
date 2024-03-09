import { SignOutUsecase } from '@domain/usecases';

import { SessionDestroyerProtocol } from '@data/protocols';

import { AuthObserver } from '@data/observers';

export class AuthSignOutUsecase implements SignOutUsecase {
  private readonly sessionDestroyer: SessionDestroyerProtocol;
  private readonly authPublisher: AuthObserver.Publisher;

  public constructor(deps: AuthSignOutUsecase.Deps) {
    this.sessionDestroyer = deps.sessionDestroyer;
    this.authPublisher = deps.authPublisher;
  }

  public async execute(): Promise<void> {
    await this.sessionDestroyer.destroySession();

    this.authPublisher.notifySignOut();
  }
}

export namespace AuthSignOutUsecase {
  export type Deps = {
    sessionDestroyer: SessionDestroyerProtocol;
    authPublisher: AuthObserver.Publisher;
  };
}

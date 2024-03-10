import { SignOutUsecase } from '@domain/usecases';

import { SignOutObserver } from '@data/observers';
import { SessionDestroyerProtocol } from '@data/protocols';

export class AuthSignOutUsecase implements SignOutUsecase {
  private readonly sessionDestroyer: SessionDestroyerProtocol;
  private readonly signOutPublisher: SignOutObserver.Publisher;

  public constructor(deps: AuthSignOutUsecase.Deps) {
    this.sessionDestroyer = deps.sessionDestroyer;
    this.signOutPublisher = deps.signOutPublisher;
  }

  public async execute(): Promise<void> {
    await this.sessionDestroyer.destroySession();

    this.signOutPublisher.notifySignOut();
  }
}

export namespace AuthSignOutUsecase {
  export type Deps = {
    sessionDestroyer: SessionDestroyerProtocol;
    signOutPublisher: SignOutObserver.Publisher;
  };
}

import { ISignOutUsecase } from '@domain/usecases';

import { SignOutObserver } from '@data/observers';
import { SessionDestroyerProtocol } from '@data/protocols';

export class SignOutUsecase implements ISignOutUsecase {
  private readonly sessionDestroyer: SessionDestroyerProtocol;
  private readonly signOutPublisher: SignOutObserver.Publisher;

  public constructor({ sessionDestroyer, signOutPublisher }: Deps) {
    this.sessionDestroyer = sessionDestroyer;
    this.signOutPublisher = signOutPublisher;
  }

  public async execute(): Promise<void> {
    await this.sessionDestroyer.destroySession();

    this.signOutPublisher.notifySignOut();
  }
}

type Deps = {
  sessionDestroyer: SessionDestroyerProtocol;
  signOutPublisher: SignOutObserver.Publisher;
};

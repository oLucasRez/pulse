import { UserModel } from '@domain/models';

import { AuthObserver } from '@data/observers';

import { authSignals } from '@presentation/signals';

const { initialized } = authSignals;

export class SignalAuthSubscriber implements AuthObserver.Subscriber {
  private static initialized = false;

  public onMeChange(me: UserModel | null): void {
    authSignals.me.value = me;

    if (!SignalAuthSubscriber.initialized) {
      SignalAuthSubscriber.initialized = true;
      initialized.value = true;
    }
  }
}

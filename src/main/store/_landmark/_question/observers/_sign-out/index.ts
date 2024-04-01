import { SignOutObserver } from '@data/observers';

import { store } from '@main/store';

import { signOutAction } from '../../actions';

export class QuestionStoreSignOutSubscriber
  implements SignOutObserver.Subscriber
{
  public onSignOut(): void {
    store.dispatch(signOutAction());
  }
}

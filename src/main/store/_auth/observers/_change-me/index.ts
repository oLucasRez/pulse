import { UserModel } from '@domain/models';

import { ChangeMeObserver } from '@data/observers';

import { store } from '@main/store';

import { changeMeAction } from '../../actions';

export class AuthStoreChangeMeSubscriber
  implements ChangeMeObserver.Subscriber
{
  public onChangeMe(me: UserModel): void {
    store.dispatch(changeMeAction(me));
  }
}

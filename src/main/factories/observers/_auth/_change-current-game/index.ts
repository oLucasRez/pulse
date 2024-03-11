import { ChangeCurrentGameObserver } from '@data/observers';

import {
  makeAuthStoreChangeCurrentGameSubscriber,
  makeGameStoreChangeCurrentGameSubscriber,
  makePlayerStoreChangeCurrentGameSubscriber,
  makeSubjectStoreChangeCurrentGameSubscriber,
} from '@main/factories';
import { ChangeCurrentGamePublisher } from '@main/observers';

export function makeChangeCurrentGamePublisher(): ChangeCurrentGameObserver.Publisher {
  const publisher = new ChangeCurrentGamePublisher();

  publisher.subscribe(makeAuthStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeGameStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makePlayerStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeSubjectStoreChangeCurrentGameSubscriber());

  return publisher;
}

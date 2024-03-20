import { ChangeCurrentGameObserver } from '@data/observers';

import {
  makeAuthStoreChangeCurrentGameSubscriber,
  makeCentralFactStoreChangeCurrentGameSubscriber,
  makeDiceStoreChangeCurrentGameSubscriber,
  makeGameStoreChangeCurrentGameSubscriber,
  makePlayerStoreChangeCurrentGameSubscriber,
  makeRoundStoreChangeCurrentGameSubscriber,
  makeSubjectStoreChangeCurrentGameSubscriber,
} from '@main/factories';
import { ChangeCurrentGamePublisher } from '@main/observers';

export function makeChangeCurrentGamePublisher(): ChangeCurrentGameObserver.Publisher {
  const publisher = new ChangeCurrentGamePublisher();

  publisher.subscribe(makeAuthStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeDiceStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeGameStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeCentralFactStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makePlayerStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeRoundStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeSubjectStoreChangeCurrentGameSubscriber());

  return publisher;
}

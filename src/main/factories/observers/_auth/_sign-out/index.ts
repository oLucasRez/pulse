import { SignOutObserver } from '@data/observers';

import {
  makeAuthStoreSignOutSubscriber,
  makeCentralFactStoreSignOutSubscriber,
  makeCentralPulseStoreSignOutSubscriber,
  makeDiceStoreSignOutSubscriber,
  makeGameStoreSignOutSubscriber,
  makePlayerStoreSignOutSubscriber,
  makeQuestionStoreSignOutSubscriber,
  makeRoundStoreSignOutSubscriber,
  makeSubjectPulseStoreSignOutSubscriber,
  makeSubjectStoreSignOutSubscriber,
} from '@main/factories';
import { SignOutPublisher } from '@main/observers';

export function makeSignOutPublisher(): SignOutObserver.Publisher {
  const publisher = new SignOutPublisher();

  publisher.subscribe(makeAuthStoreSignOutSubscriber());
  publisher.subscribe(makeDiceStoreSignOutSubscriber());
  publisher.subscribe(makeGameStoreSignOutSubscriber());
  publisher.subscribe(makeCentralFactStoreSignOutSubscriber());
  publisher.subscribe(makeQuestionStoreSignOutSubscriber());
  publisher.subscribe(makeSubjectStoreSignOutSubscriber());
  publisher.subscribe(makePlayerStoreSignOutSubscriber());
  publisher.subscribe(makeCentralPulseStoreSignOutSubscriber());
  publisher.subscribe(makeSubjectPulseStoreSignOutSubscriber());
  publisher.subscribe(makeRoundStoreSignOutSubscriber());

  return publisher;
}

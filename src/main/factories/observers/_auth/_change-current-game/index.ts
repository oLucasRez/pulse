import { ChangeCurrentGameObserver } from '@data/observers';

import {
  makeAnswerStoreChangeCurrentGameSubscriber,
  makeAuthStoreChangeCurrentGameSubscriber,
  makeCentralFactStoreChangeCurrentGameSubscriber,
  makeCentralPulseStoreChangeCurrentGameSubscriber,
  makeDiceStoreChangeCurrentGameSubscriber,
  makeGameStoreChangeCurrentGameSubscriber,
  makePlayerStoreChangeCurrentGameSubscriber,
  makeQuestionStoreChangeCurrentGameSubscriber,
  makeRoundStoreChangeCurrentGameSubscriber,
  makeSubjectPulseStoreChangeCurrentGameSubscriber,
  makeSubjectStoreChangeCurrentGameSubscriber,
} from '@main/factories';
import { ChangeCurrentGamePublisher } from '@main/observers';

export function makeChangeCurrentGamePublisher(): ChangeCurrentGameObserver.Publisher {
  const publisher = new ChangeCurrentGamePublisher();

  publisher.subscribe(makeAnswerStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeAuthStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeDiceStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeGameStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeCentralFactStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeQuestionStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeSubjectStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makePlayerStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeCentralPulseStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeSubjectPulseStoreChangeCurrentGameSubscriber());
  publisher.subscribe(makeRoundStoreChangeCurrentGameSubscriber());

  return publisher;
}

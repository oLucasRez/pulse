import { ChangeQuestionObserver } from '@data/observers';

import { makeQuestionStoreChangeQuestionSubscriber } from '@main/factories';
import { ChangeQuestionPublisher } from '@main/observers';

export function makeChangeQuestionPublisher(): ChangeQuestionObserver.Publisher {
  const publisher = new ChangeQuestionPublisher();

  publisher.subscribe(makeQuestionStoreChangeQuestionSubscriber());

  return publisher;
}

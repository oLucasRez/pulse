import { CreateQuestionObserver } from '@data/observers';

import { makeQuestionStoreCreateQuestionSubscriber } from '@main/factories';
import { CreateQuestionPublisher } from '@main/observers';

export function makeCreateQuestionPublisher(): CreateQuestionObserver.Publisher {
  const publisher = new CreateQuestionPublisher();

  publisher.subscribe(makeQuestionStoreCreateQuestionSubscriber());

  return publisher;
}

import { WatchQuestionsUsecase } from '@domain/usecases';

import { makeDAOWatchQuestionsUsecase } from './dao';

export function makeWatchQuestionsUsecase(): WatchQuestionsUsecase {
  return makeDAOWatchQuestionsUsecase();
}

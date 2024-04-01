import { CreateQuestionUsecase } from '@domain/usecases';

import { makeDAOCreateQuestionUsecase } from './dao';

export function makeCreateQuestionUsecase(): CreateQuestionUsecase {
  return makeDAOCreateQuestionUsecase();
}

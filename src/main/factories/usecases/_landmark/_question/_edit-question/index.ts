import { IEditQuestionUsecase } from '@domain/usecases';

import { EditQuestionUsecase } from '@data/usecases';

import {
  makeGetMyPlayerUsecase,
  makeGetQuestionUsecase,
  makeQuestionDAO,
  makeQuestionHydrator,
} from '@main/factories';

export function makeEditQuestionUsecase(): IEditQuestionUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const getQuestion = makeGetQuestionUsecase();
  const questionDAO = makeQuestionDAO();
  const questionHydrator = makeQuestionHydrator();

  return new EditQuestionUsecase({
    getMyPlayer,
    getQuestion,
    questionDAO,
    questionHydrator,
  });
}

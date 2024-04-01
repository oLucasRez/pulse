import { CreateQuestionUsecase } from '@domain/usecases';

import { DAOCreateQuestionUsecase } from '@data/usecases';

import {
  makeCreateQuestionPublisher,
  makeGetMyPlayerUsecase,
  makeGetMySubjectUsecase,
  makeQuestionDAO,
} from '@main/factories';

export function makeDAOCreateQuestionUsecase(): CreateQuestionUsecase {
  const createQuestionPublisher = makeCreateQuestionPublisher();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const getMySubject = makeGetMySubjectUsecase();
  const questionDAO = makeQuestionDAO();

  return new DAOCreateQuestionUsecase({
    createQuestionPublisher,
    getMyPlayer,
    getMySubject,
    questionDAO,
  });
}

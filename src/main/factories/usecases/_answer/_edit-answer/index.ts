import { IEditAnswerUsecase } from '@domain/usecases';

import { EditAnswerUsecase } from '@data/usecases';

import {
  makeAnswerDAO,
  makeAnswerHydrator,
  makeGetAnswerUsecase,
  makeGetMyPlayerUsecase,
} from '@main/factories';

export function makeEditAnswerUsecase(): IEditAnswerUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const getAnswer = makeGetAnswerUsecase();
  const answerDAO = makeAnswerDAO();
  const answerHydrator = makeAnswerHydrator();

  return new EditAnswerUsecase({
    getMyPlayer,
    getAnswer,
    answerDAO,
    answerHydrator,
  });
}

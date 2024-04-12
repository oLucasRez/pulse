import { IChangeMySubjectPositionUsecase } from '@domain/usecases';

import { ChangeMySubjectPositionUsecase } from '@data/usecases';

import {
  makeChangeSubjectPublisher,
  makeGetMyPlayerUsecase,
  makeNextGameStateUsecase,
  makeSubjectDAO,
} from '@main/factories';

export function makeChangeMySubjectPositionUsecase(): IChangeMySubjectPositionUsecase {
  const changeSubjectPublisher = makeChangeSubjectPublisher();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const nextGameState = makeNextGameStateUsecase();
  const subjectDAO = makeSubjectDAO();

  return new ChangeMySubjectPositionUsecase({
    changeSubjectPublisher,
    getMyPlayer,
    nextGameState,
    subjectDAO,
  });
}

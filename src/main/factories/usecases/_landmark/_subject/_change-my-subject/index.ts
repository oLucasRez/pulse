import { IChangeMySubjectPositionUsecase } from '@domain/usecases';

import { ChangeMySubjectPositionUsecase } from '@data/usecases';

import {
  makeGetMyPlayerUsecase,
  makeNextGameStateUsecase,
  makeSubjectDAO,
  makeSubjectHydrator,
} from '@main/factories';

export function makeChangeMySubjectPositionUsecase(): IChangeMySubjectPositionUsecase {
  const getMyPlayer = makeGetMyPlayerUsecase();
  const nextGameState = makeNextGameStateUsecase();
  const subjectDAO = makeSubjectDAO();
  const subjectHydrator = makeSubjectHydrator();

  return new ChangeMySubjectPositionUsecase({
    getMyPlayer,
    nextGameState,
    subjectDAO,
    subjectHydrator,
  });
}

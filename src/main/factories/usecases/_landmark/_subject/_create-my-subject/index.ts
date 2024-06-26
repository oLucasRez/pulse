import { ICreateMySubjectUsecase } from '@domain/usecases';

import { CreateMySubjectUsecase } from '@data/usecases';

import {
  makeCreateSubjectUsecase,
  makeGetCurrentGameUsecase,
  makeGetMyPlayerUsecase,
  makeNextGameStateUsecase,
} from '@main/factories';

export function makeCreateMySubjectUsecase(): ICreateMySubjectUsecase {
  const createSubject = makeCreateSubjectUsecase();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMyPlayer = makeGetMyPlayerUsecase();
  const nextGameState = makeNextGameStateUsecase();

  return new CreateMySubjectUsecase({
    createSubject,
    getCurrentGame,
    getMyPlayer,
    nextGameState,
  });
}

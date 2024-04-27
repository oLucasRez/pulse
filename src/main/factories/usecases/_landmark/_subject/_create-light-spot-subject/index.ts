import { ICreateLightSpotSubjectUsecase } from '@domain/usecases';

import { CreateLightSpotSubjectUsecase } from '@data/usecases';

import {
  makeGetCurrentLightSpotDiceUsecase,
  makeNextGameStateUsecase,
  makeSetDicePositionUsecase,
  makeSetLightSpotLandmarkUsecase,
  makeSubjectDAO,
  makeSubjectHydrator,
  makeVerifyDicesOverloadUsecase,
} from '@main/factories';

export function makeCreateLightSpotSubjectUsecase(): ICreateLightSpotSubjectUsecase {
  const getCurrentLightSpotDice = makeGetCurrentLightSpotDiceUsecase();
  const nextGameState = makeNextGameStateUsecase();
  const setDicePosition = makeSetDicePositionUsecase();
  const setLightSpotLandmark = makeSetLightSpotLandmarkUsecase();
  const subjectDAO = makeSubjectDAO();
  const subjectHydrator = makeSubjectHydrator();
  const verifyDicesOverload = makeVerifyDicesOverloadUsecase();

  return new CreateLightSpotSubjectUsecase({
    getCurrentLightSpotDice,
    nextGameState,
    setDicePosition,
    setLightSpotLandmark,
    subjectDAO,
    subjectHydrator,
    verifyDicesOverload,
  });
}

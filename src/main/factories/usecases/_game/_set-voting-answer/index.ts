import { ISetVotingAnswerUsecase } from '@domain/usecases';

import { SetVotingAnswerUsecase } from '@data/usecases';

import {
  makeGameDAO,
  makeGameHydrator,
  makeGetCurrentGameUsecase,
} from '@main/factories';

export function makeSetVotingAnswerUsecase(): ISetVotingAnswerUsecase {
  const gameDAO = makeGameDAO();
  const gameHydrator = makeGameHydrator();
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new SetVotingAnswerUsecase({
    gameDAO,
    gameHydrator,
    getCurrentGame,
  });
}

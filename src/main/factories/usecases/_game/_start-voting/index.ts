import { IStartVotingUsecase } from '@domain/usecases';

import { StartVotingUsecase } from '@data/usecases';

import {
  makeGameDAO,
  makeGameHydrator,
  makeGetCurrentGameUsecase,
  makeGetCurrentPlayerUsecase,
} from '@main/factories';

export function makeStartVotingUsecase(): IStartVotingUsecase {
  const gameDAO = makeGameDAO();
  const gameHydrator = makeGameHydrator();
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getCurrentPlayer = makeGetCurrentPlayerUsecase();

  return new StartVotingUsecase({
    gameDAO,
    gameHydrator,
    getCurrentGame,
    getCurrentPlayer,
  });
}

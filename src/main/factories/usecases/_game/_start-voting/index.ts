import { IStartVotingUsecase } from '@domain/usecases';

import { StartVotingUsecase } from '@data/usecases';

import {
  makeChangeGamePublisher,
  makeGameDAO,
  makeGetCurrentGameUsecase,
} from '@main/factories';

export function makeStartVotingUsecase(): IStartVotingUsecase {
  const changeGamePublisher = makeChangeGamePublisher();
  const gameDAO = makeGameDAO();
  const getCurrentGame = makeGetCurrentGameUsecase();

  return new StartVotingUsecase({
    changeGamePublisher,
    gameDAO,
    getCurrentGame,
  });
}

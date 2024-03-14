import { GetMyPlayerUsecase } from '@domain/usecases';

import { DAOGetMyPlayerUsecase } from '@data/usecases';

import {
  makeFetchPlayerPublisher,
  makeGetMeUsecase,
  makePlayerDAO,
} from '@main/factories';

export function makeDAOGetMyPlayerUsecase(): GetMyPlayerUsecase {
  const getMe = makeGetMeUsecase();
  const playerDAO = makePlayerDAO();
  const fetchPlayerPublisher = makeFetchPlayerPublisher();

  return new DAOGetMyPlayerUsecase({
    getMe,
    playerDAO,
    fetchPlayerPublisher,
  });
}

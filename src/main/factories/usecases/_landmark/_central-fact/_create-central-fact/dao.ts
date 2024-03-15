import { CreateCentralFactUsecase } from '@domain/usecases';

import { DAOCreateCentralFactUsecase } from '@data/usecases';

import {
  makeCentralFactDAO,
  makeCreateCentralFactPublisher,
} from '@main/factories';

export function makeDAOCreateCentralFactUsecase(): CreateCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();
  const createCentralFactPublisher = makeCreateCentralFactPublisher();

  return new DAOCreateCentralFactUsecase({
    centralFactDAO,
    createCentralFactPublisher,
  });
}

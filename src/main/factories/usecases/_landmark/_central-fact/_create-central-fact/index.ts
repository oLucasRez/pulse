import { ICreateCentralFactUsecase } from '@domain/usecases';

import { CreateCentralFactUsecase } from '@data/usecases';

import {
  makeCentralFactDAO,
  makeCreateCentralFactPublisher,
} from '@main/factories';

export function makeCreateCentralFactUsecase(): ICreateCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();
  const createCentralFactPublisher = makeCreateCentralFactPublisher();

  return new CreateCentralFactUsecase({
    centralFactDAO,
    createCentralFactPublisher,
  });
}

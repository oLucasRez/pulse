import { ICreateCentralFactUsecase } from '@domain/usecases';

import { CreateCentralFactUsecase } from '@data/usecases';

import { makeCentralFactDAO, makeCentralFactHydrator } from '@main/factories';

export function makeCreateCentralFactUsecase(): ICreateCentralFactUsecase {
  const centralFactDAO = makeCentralFactDAO();
  const centralFactHydrator = makeCentralFactHydrator();

  return new CreateCentralFactUsecase({
    centralFactDAO,
    centralFactHydrator,
  });
}

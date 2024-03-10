import { ChangeMeUsecase } from '@domain/usecases';

import { makeDAOChangeMeUsecase } from './crud';

export function makeChangeMeUsecase(): ChangeMeUsecase {
  return makeDAOChangeMeUsecase();
}

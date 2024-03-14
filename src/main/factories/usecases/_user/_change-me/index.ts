import { ChangeMeUsecase } from '@domain/usecases';

import { makeDAOChangeMeUsecase } from './dao';

export function makeChangeMeUsecase(): ChangeMeUsecase {
  return makeDAOChangeMeUsecase();
}

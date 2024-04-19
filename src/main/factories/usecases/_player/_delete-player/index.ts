import { IDeletePlayerUsecase } from '@domain/usecases';

import { DeletePlayerUsecase } from '@data/usecases';

import { makePlayerDAO } from '@main/factories';

export function makeDeletePlayerUsecase(): IDeletePlayerUsecase {
  const playerDAO = makePlayerDAO();

  return new DeletePlayerUsecase({ playerDAO });
}

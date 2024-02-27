import { GetGame } from '@data/usecases';
import { GetGameUsecase } from '@domain/usecases';

import { makeGameCRUD } from '@main/factories';

export function makeGetGameUsecase(): GetGameUsecase {
  const gameCRUD = makeGameCRUD();

  return new GetGame({ gameCRUD });
}

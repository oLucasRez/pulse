import { DeleteGame } from '@data/usecases';
import { DeleteGameUsecase } from '@domain/usecases';

import { makeGameCRUD } from '@main/factories';

export function makeDeleteGameUsecase(): DeleteGameUsecase {
  const gameCRUD = makeGameCRUD();

  return new DeleteGame({ gameCRUD });
}

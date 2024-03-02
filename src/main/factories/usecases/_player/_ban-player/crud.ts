import { CRUDBanPlayerUsecase } from '@data/usecases';
import { BanPlayerUsecase } from '@domain/usecases';

import {
  makeGetCurrentGameUsecase,
  makeGetMeUsecase,
  makePlayerCRUD,
} from '@main/factories';

export function makeCRUDBanPlayerUsecase(): BanPlayerUsecase {
  const getCurrentGame = makeGetCurrentGameUsecase();
  const getMe = makeGetMeUsecase();
  const playerCRUD = makePlayerCRUD();

  return new CRUDBanPlayerUsecase({ getCurrentGame, getMe, playerCRUD });
}

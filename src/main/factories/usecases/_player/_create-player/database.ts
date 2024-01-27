import { DatabaseCreatePlayerUsecase } from '@data/usecases';
import { CreatePlayerUsecase } from '@domain/usecases';

import { makeFirebaseDatabase } from '@main/factories/adapters';

import { makePlayersTable } from '..';
import { makeDatabaseGetDiceUsecase } from '../../_dice';

export function makeDatabaseCreatePlayerUsecase(): CreatePlayerUsecase {
  const table = makePlayersTable();
  const database = makeFirebaseDatabase();
  const getDice = makeDatabaseGetDiceUsecase();

  return new DatabaseCreatePlayerUsecase({ table, database, getDice });
}

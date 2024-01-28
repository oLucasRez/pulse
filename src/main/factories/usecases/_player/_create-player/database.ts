import { DatabaseCreatePlayerUsecase } from '@data/usecases';
import { CreatePlayerUsecase } from '@domain/usecases';

import { makeFirebaseDatabase } from '@main/factories';

import {
  makeDatabaseChangeDiceUsecase,
  makeDatabaseDeletePlayerUsecase,
  makeDatabaseGetDiceUsecase,
  makePlayersTableGenerator,
} from '../..';

export function makeDatabaseCreatePlayerUsecase(): CreatePlayerUsecase {
  const tableGenerator = makePlayersTableGenerator();
  const database = makeFirebaseDatabase();
  const getDice = makeDatabaseGetDiceUsecase();
  const changeDice = makeDatabaseChangeDiceUsecase();
  const deletePlayer = makeDatabaseDeletePlayerUsecase();

  return new DatabaseCreatePlayerUsecase({
    tableGenerator,
    database,
    getDice,
    changeDice,
    deletePlayer,
  });
}

import { DatabaseCreatePlayerUsecase } from '@data/usecases';
import { CreatePlayerUsecase } from '@domain/usecases';

import { makeFirebaseDatabase } from '@main/factories';

import {
  makeDatabaseChangeDiceUsecase,
  makeDatabaseDeletePlayerUsecase,
  makeDatabaseGetDiceUsecase,
  makeDatabaseGetPlayersUsecase,
  makePlayersTableGenerator,
} from '../..';

export function makeDatabaseCreatePlayerUsecase(): CreatePlayerUsecase {
  const tableGenerator = makePlayersTableGenerator();
  const database = makeFirebaseDatabase();
  const getDice = makeDatabaseGetDiceUsecase();
  const getPlayers = makeDatabaseGetPlayersUsecase();
  const changeDice = makeDatabaseChangeDiceUsecase();
  const deletePlayer = makeDatabaseDeletePlayerUsecase();

  return new DatabaseCreatePlayerUsecase({
    tableGenerator,
    database,
    getDice,
    getPlayers,
    changeDice,
    deletePlayer,
  });
}

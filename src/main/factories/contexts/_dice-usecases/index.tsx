import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { DiceUsecasesContextProvider } from '@presentation/contexts';

import {
  makeDatabaseChangeDiceUsecase,
  makeDatabaseCreateDiceUsecase,
  makeDatabaseDeleteDiceUsecase,
  makeDatabaseGetDicesUsecase,
  makeDatabaseGetDiceUsecase,
  makeSocketWatchDicesUsecase,
} from '@main/factories';

export function makeDiceUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getDices = makeDatabaseGetDicesUsecase();
  const getDice = makeDatabaseGetDiceUsecase();
  const watchDices = makeSocketWatchDicesUsecase();
  const createDice = makeDatabaseCreateDiceUsecase();
  const changeDice = makeDatabaseChangeDiceUsecase();
  const deleteDice = makeDatabaseDeleteDiceUsecase();

  return (
    <DiceUsecasesContextProvider
      getDices={getDices}
      getDice={getDice}
      watchDices={watchDices}
      createDice={createDice}
      changeDice={changeDice}
      deleteDice={deleteDice}
      {...props}
    />
  );
}

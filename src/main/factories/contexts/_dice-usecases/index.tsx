import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { DiceUsecasesContextProvider } from '@presentation/contexts';

import {
  makeChangeDiceUsecase,
  makeCreateDiceUsecase,
  makeGetDicesUsecase,
  makeGetDiceUsecase,
  makeWatchDicesUsecase,
} from '@main/factories';

export function makeDiceUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getDices = makeGetDicesUsecase();
  const getDice = makeGetDiceUsecase();
  const watchDices = makeWatchDicesUsecase();
  const createDice = makeCreateDiceUsecase();
  const changeDice = makeChangeDiceUsecase();

  return (
    <DiceUsecasesContextProvider
      getDices={getDices}
      getDice={getDice}
      watchDices={watchDices}
      createDice={createDice}
      changeDice={changeDice}
      {...props}
    />
  );
}

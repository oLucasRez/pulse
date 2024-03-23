import { ReactElement } from 'react';

import { DiceUsecasesContextProvider } from '@presentation/contexts';
import { ContextProviderProps } from '@presentation/types';

import {
  makeChangeDiceUsecase,
  makeRollDiceUsecase,
  makeWatchDicesUsecase,
} from '@main/factories';

export function makeDiceUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const rollDice = makeRollDiceUsecase();
  const changeDice = makeChangeDiceUsecase();
  const watchDices = makeWatchDicesUsecase();

  return (
    <DiceUsecasesContextProvider
      rollDice={rollDice}
      watchDices={watchDices}
      changeDice={changeDice}
      {...props}
    />
  );
}

import { ReactElement } from 'react';

import { DiceContextProvider } from '@presentation/hooks';
import { ContextProviderProps } from '@presentation/types';

import {
  makeGetDicesUsecase,
  makeRollDiceUsecase,
  makeWatchDicesUsecase,
} from '@main/factories';

export function makeDiceContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getDices = makeGetDicesUsecase();
  const watchDices = makeWatchDicesUsecase();
  const rollDice = makeRollDiceUsecase();

  return (
    <DiceContextProvider
      getDices={getDices}
      watchDices={watchDices}
      rollDice={rollDice}
      {...props}
    />
  );
}

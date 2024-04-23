import { ReactElement } from 'react';

import { DiceContextProvider } from '@presentation/hooks';
import { ContextProviderProps } from '@presentation/types';

import {
  makeGetDicesUsecase,
  makeRollCurrentDiceUsecase,
  makeRollCurrentLightSpotDiceUsecase,
  makeWatchDicesUsecase,
} from '@main/factories';

export function makeDiceContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getDices = makeGetDicesUsecase();
  const watchDices = makeWatchDicesUsecase();
  const rollCurrentDice = makeRollCurrentDiceUsecase();
  const rollCurrentLightSpotDice = makeRollCurrentLightSpotDiceUsecase();

  return (
    <DiceContextProvider
      getDices={getDices}
      watchDices={watchDices}
      rollCurrentDice={rollCurrentDice}
      rollCurrentLightSpotDice={rollCurrentLightSpotDice}
      {...props}
    />
  );
}

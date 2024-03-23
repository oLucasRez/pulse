import { createContext, FC, useCallback, useContext } from 'react';

import { WatchRoundsUsecase } from '@domain/usecases';

import { useSelector } from '@presentation/hooks';

import {
  currentDiceSelector,
  currentLightSpotDiceSelector,
  currentLightSpotPlayerSelector,
  currentPlayerSelector,
  lightSpotRoundSelector,
  roundSelector,
} from '@main/store';

import {
  RoundUsecasesContextProviderProps,
  RoundUsecasesContextValue,
} from './types';

const Context = createContext({} as RoundUsecasesContextValue);

export const useRoundUsecases = (): RoundUsecasesContextValue =>
  useContext(Context);

export const RoundUsecasesContextProvider: FC<
  RoundUsecasesContextProviderProps
> = (props) => {
  const { children } = props;

  const round = useSelector(roundSelector);
  const currentPlayer = useSelector(currentPlayerSelector);
  const currentDice = useSelector(currentDiceSelector);
  const lightSpotRound = useSelector(lightSpotRoundSelector);
  const currentLightSpotPlayer = useSelector(currentLightSpotPlayerSelector);
  const currentLightSpotDice = useSelector(currentLightSpotDiceSelector);

  const watchRounds = useCallback(
    (callback?: WatchRoundsUsecase.Callback) =>
      props.watchRounds.execute(callback ?? ((): any => {})),
    [],
  );

  return (
    <Context.Provider
      value={{
        round,
        currentPlayer,
        currentDice,
        lightSpotRound,
        currentLightSpotPlayer,
        currentLightSpotDice,
        watchRounds,
      }}
    >
      {children}
    </Context.Provider>
  );
};

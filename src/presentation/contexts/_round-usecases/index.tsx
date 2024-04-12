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

import { usePlayerUsecases } from '../_player-usecases';

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
      props.watchRounds.execute(callback ?? (() => {})),
    [],
  );

  const { myPlayer } = usePlayerUsecases();

  const isMyTurn = !!currentPlayer && currentPlayer?.id === myPlayer?.id;

  return (
    <Context.Provider
      value={{
        round,
        isMyTurn,
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

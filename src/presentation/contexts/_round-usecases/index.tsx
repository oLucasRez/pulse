import { createContext, FC, useCallback, useContext } from 'react';

import { NotFoundError } from '@domain/errors';
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

  const passTurn = useCallback(() => {
    if (!round) throw new NotFoundError({ metadata: { entity: 'Round' } });

    return props.passTurn.execute(round.id);
  }, [round]);

  const passLightSpotTurn = useCallback(() => {
    if (!lightSpotRound)
      throw new NotFoundError({ metadata: { entity: 'Round' } });

    return props.passTurn.execute(lightSpotRound.id);
  }, [lightSpotRound]);

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
        passTurn,
        passLightSpotTurn,
        watchRounds,
      }}
    >
      {children}
    </Context.Provider>
  );
};

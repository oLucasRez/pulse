import { createContext, FC, useCallback, useContext, useEffect } from 'react';

import { RoundModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import { gameSignals } from '@presentation/signals';

import { useStates } from '@presentation/hooks';

import { logError } from '@presentation/utils';

import {
  RoundUsecasesContextProviderProps,
  RoundUsecasesContextValue,
} from './types';

const Context = createContext({} as RoundUsecasesContextValue);

export const useRoundUsecases = (): RoundUsecasesContextValue =>
  useContext(Context);

const { currentGame } = gameSignals;

export const RoundUsecasesContextProvider: FC<
  RoundUsecasesContextProviderProps
> = (props) => {
  const {
    getRound,

    children,
  } = props;

  const [s, set] = useStates({ round: null as RoundModel | null });

  useEffect(() => {
    if (!currentGame.value?.roundID) return;

    getRound
      .execute(currentGame.value.roundID)
      .then(set('round'))
      .catch(logError);
  }, [currentGame.value?.roundID]);

  const passTurn = useCallback(() => {
    if (!currentGame.value)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });
    if (!currentGame.value.roundID)
      throw new NotFoundError({ metadata: { entity: 'Round' } });

    return props.passTurn.execute(currentGame.value.roundID);
  }, [currentGame.value, props.passTurn]);

  const passLightspotTurn = useCallback(() => {
    if (!currentGame.value)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });
    if (!currentGame.value.lightspotRoundID)
      throw new NotFoundError({ metadata: { entity: 'Round' } });

    return props.passTurn.execute(currentGame.value.lightspotRoundID);
  }, [currentGame.value, props.passTurn]);

  return (
    <Context.Provider
      value={{
        round: s.round,
        passTurn,
        passLightspotTurn,
      }}
    >
      {children}
    </Context.Provider>
  );
};

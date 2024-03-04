import { createContext, FC, useCallback, useContext, useEffect } from 'react';

import { RoundModel } from '@domain/models';

import { NotFoundError } from '@domain/errors';

import {
  RoundUsecasesContextProviderProps,
  RoundUsecasesContextValue,
} from './types';

import { useStates } from '@presentation/hooks';

import { logError } from '@presentation/utils';

import { useGameUsecases } from '..';

const Context = createContext({} as RoundUsecasesContextValue);

export const useRoundUsecases = (): RoundUsecasesContextValue =>
  useContext(Context);

export const RoundUsecasesContextProvider: FC<
  RoundUsecasesContextProviderProps
> = (props) => {
  const {
    getRound,

    children,
  } = props;

  const [s, set] = useStates({ round: null as RoundModel | null });

  const { currentGame } = useGameUsecases();

  useEffect(() => {
    if (!currentGame?.roundID) return;

    getRound.execute(currentGame.roundID).then(set('round')).catch(logError);
  }, [currentGame?.roundID]);

  const passTurn = useCallback(() => {
    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });
    if (!currentGame.roundID)
      throw new NotFoundError({ metadata: { entity: 'Round' } });

    return props.passTurn.execute(currentGame.roundID);
  }, [currentGame, props.passTurn]);

  const passLightspotTurn = useCallback(() => {
    if (!currentGame)
      throw new NotFoundError({ metadata: { entity: 'CurrentGame' } });
    if (!currentGame.lightspotRoundID)
      throw new NotFoundError({ metadata: { entity: 'Round' } });

    return props.passTurn.execute(currentGame.lightspotRoundID);
  }, [currentGame, props.passTurn]);

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

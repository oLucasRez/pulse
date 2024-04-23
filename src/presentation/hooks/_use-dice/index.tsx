import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, FC, useContext, useMemo } from 'react';

import { DiceModel } from '@domain/models';

import { DiceContextProviderProps, DiceContextValue } from './types';

import { useGame } from '../_use-game';
import { usePlayer } from '../_use-player';
import { useUsecase } from '../_use-usecase';
import { useWatch } from '../_use-watch';

const Context = createContext({} as DiceContextValue);

export const useDice = (): DiceContextValue => useContext(Context);

export const DiceContextProvider: FC<DiceContextProviderProps> = ({
  getDices,
  watchDices,
  children,
  ...props
}) => {
  const { currentGame } = useGame();

  const queryKey = [currentGame?.id, 'dices'];

  const { data: dices = [] } = useQuery({
    queryKey,
    queryFn: () => getDices.execute(),
  });

  const { currentPlayer, currentLightSpotPlayer } = usePlayer();

  const currentDice = useMemo(
    () => dices.find(({ id }) => id === currentPlayer?.diceID) ?? null,
    [dices, currentPlayer?.diceID],
  );

  const currentLightSpotDice = useMemo(
    () => dices.find(({ id }) => id === currentLightSpotPlayer?.diceID) ?? null,
    [dices, currentLightSpotPlayer?.diceID],
  );

  const queryClient = useQueryClient();

  function replaceAll(dices: DiceModel[]): void {
    queryClient.setQueryData<DiceModel[]>(queryKey, () => dices);
  }

  const rollCurrentDice = useUsecase(props.rollCurrentDice);

  const rollCurrentLightSpotDice = useUsecase(props.rollCurrentLightSpotDice);

  useWatch(async () => {
    if (currentGame) return watchDices.execute((dices) => replaceAll(dices));
  }, [currentGame]);

  return (
    <Context.Provider
      value={{
        dices,
        currentDice,
        currentLightSpotDice,
        rollCurrentDice,
        rollCurrentLightSpotDice,
      }}
    >
      {children}
    </Context.Provider>
  );
};

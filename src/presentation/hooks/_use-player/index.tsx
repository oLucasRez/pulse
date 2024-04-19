import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, FC, useContext, useMemo } from 'react';

import { PlayerModel, UserModel } from '@domain/models';

import { PlayerContextProviderProps, PlayerContextValue } from './types';

import { useGame } from '../_use-game';
import { useRound } from '../_use-round';
import { useUsecase } from '../_use-usecase';
import { useWatch } from '../_use-watch';

const Context = createContext({} as PlayerContextValue);

export const usePlayer = (): PlayerContextValue => useContext(Context);

export const PlayerContextProvider: FC<PlayerContextProviderProps> = ({
  getPlayers,
  watchPlayers,
  children,
  ...props
}) => {
  const { currentGame } = useGame();

  const queryClient = useQueryClient();

  const queryKey = [currentGame?.id, 'players'];

  const { data: allPlayers = [], isLoading } = useQuery({
    queryKey,
    queryFn: () => getPlayers.execute({ includeBanned: true }),
  });

  const fetchingPlayers = isLoading || !currentGame;

  const players = useMemo(
    () => allPlayers.filter(({ banned }) => !banned),
    [allPlayers],
  );

  const myPlayer = useMemo(() => {
    const me = queryClient.getQueryData<UserModel | null>(['me']) ?? null;
    return allPlayers.find(({ uid }) => me?.uid === uid) ?? null;
  }, [allPlayers]);

  const { round, lightSpotRound } = useRound();

  const currentPlayer = useMemo(
    () =>
      players.find(
        ({ id }) => id === (round?.playerIDs ?? [])[round?.i ?? -1],
      ) ?? null,
    [players, round],
  );

  const currentLightSpotPlayer = useMemo(
    () =>
      players.find(
        ({ id }) =>
          id === (lightSpotRound?.playerIDs ?? [])[lightSpotRound?.i ?? -1],
      ) ?? null,
    [players, lightSpotRound],
  );

  const isMyTurn = !!currentPlayer && currentPlayer?.id === myPlayer?.id;

  function replaceAll(players: PlayerModel[]): void {
    queryClient.setQueryData<PlayerModel[]>(queryKey, () => players);
    queryClient.invalidateQueries({ queryKey: [currentGame?.id, 'dices'] });
  }

  const createPlayer = useUsecase(props.createPlayer);

  const changePlayer = useUsecase(props.changePlayer);

  const banPlayer = useUsecase(props.banPlayer);

  useWatch(async () => {
    if (currentGame)
      return watchPlayers.execute((players) => replaceAll(players));
  }, [currentGame]);

  return (
    <Context.Provider
      value={{
        players,
        allPlayers,
        myPlayer,
        currentPlayer,
        currentLightSpotPlayer,
        fetchingPlayers,
        isMyTurn,
        createPlayer,
        changePlayer,
        banPlayer,
      }}
    >
      {children}
    </Context.Provider>
  );
};

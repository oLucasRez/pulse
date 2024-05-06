import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, FC, useContext, useEffect, useMemo } from 'react';

import { PlayerModel, UserModel } from '@domain/models';

import { PlayerContextProviderProps, PlayerContextValue } from './types';

import { useGame } from '../_use-game';
import { useRound } from '../_use-round';
import { useStates } from '../_use-states';
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
    () => players.find(({ order }) => order === round?.i) ?? null,
    [players, round],
  );

  const currentLightSpotPlayer = useMemo(
    () => players.find(({ order }) => order === lightSpotRound?.i) ?? null,
    [players, lightSpotRound],
  );

  const isMyTurn = !!currentPlayer && currentPlayer?.id === myPlayer?.id;
  const [s] = useStates({
    turnIsSafe: false,
    lastGameState: currentGame?.state,
  });

  useEffect(() => {
    if (!round || round.i === null) s.turnIsSafe = false;
  }, [round?.i]);

  useEffect(() => {
    if (!currentGame) return;
    if (
      currentGame.state[0] === s.lastGameState?.[0] &&
      currentGame.state[1] === s.lastGameState?.[1]
    )
      return;
    if (!s.lastGameState) s.lastGameState = currentGame.state;

    s.turnIsSafe = true;
  }, [currentGame]);

  const isMyLightSpotTurn =
    !!currentLightSpotPlayer && currentLightSpotPlayer?.id === myPlayer?.id;

  function replaceAll(players: PlayerModel[]): void {
    queryClient.setQueryData<PlayerModel[]>(queryKey, () => players);
    queryClient.invalidateQueries({ queryKey: [currentGame?.id, 'answers'] });
    queryClient.invalidateQueries({ queryKey: [currentGame?.id, 'dices'] });
    queryClient.invalidateQueries({ queryKey: [currentGame?.id, 'questions'] });
    queryClient.invalidateQueries({ queryKey: [currentGame?.id, 'subjects'] });
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
        turnIsSafe: s.turnIsSafe,
        isMyLightSpotTurn,
        createPlayer,
        changePlayer,
        banPlayer,
      }}
    >
      {children}
    </Context.Provider>
  );
};

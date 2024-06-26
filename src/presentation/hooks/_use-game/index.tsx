import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, FC, useContext, useMemo } from 'react';

import { GameModel } from '@domain/models';

import { GameContextProviderProps, GameContextValue } from './types';

import { useUsecase } from '../_use-usecase';
import { useUser } from '../_use-user';
import { useWatch } from '../_use-watch';

const Context = createContext({} as GameContextValue);

export const useGame = (): GameContextValue => useContext(Context);

export const GameContextProvider: FC<GameContextProviderProps> = ({
  getGames,
  watchGames,
  children,
  ...props
}) => {
  const { me } = useUser();

  const queryKey = [me?.uid, 'games'];

  const queryClient = useQueryClient();

  const { data: games = [], isLoading } = useQuery({
    queryKey,
    queryFn: () => getGames.execute(),
  });

  const fetchingGames = isLoading || !me;

  const currentGame = useMemo(
    () => games.find(({ id }) => id === me?.currentGameID) ?? null,
    [games, me],
  );

  const imHost = !!me && currentGame?.uid === me.uid;

  function replaceAll(games: GameModel[]): void {
    queryClient.setQueryData<GameModel[]>(queryKey, () => games);
    queryClient.invalidateQueries({ queryKey: [currentGame?.id, 'answers'] });
  }

  function replaceOrAppendData(game: GameModel): void {
    queryClient.setQueryData<GameModel[]>(queryKey, (games = []) => {
      const i = games.findIndex(({ id }) => id === game.id);
      if (i === -1) return [...games, game];
      const newGames = [...games];
      newGames.splice(i, 1, game);
      return newGames;
    });
    queryClient.invalidateQueries({ queryKey: [currentGame?.id, 'answers'] });
  }

  function removeData(id: string): void {
    queryClient.setQueryData<GameModel[]>(queryKey, (games = []) => {
      const i = games.findIndex((game) => game.id === id);
      if (i === -1) return games;
      const newGames = [...games];
      newGames.splice(i, 1);
      return newGames;
    });
    queryClient.invalidateQueries({ queryKey: [currentGame?.id, 'answers'] });
  }

  const createGame = useUsecase(props.createGame, {
    onSuccess: (game) => replaceOrAppendData(game),
  });

  const changeGame = useUsecase(props.changeGame, {
    onSuccess: (game) => replaceOrAppendData(game),
  });

  const deleteGame = useUsecase(props.deleteGame, {
    onSuccess: (_, [id]) => removeData(id),
  });

  const startGame = useUsecase(props.startGame, {
    onSuccess: (game) => replaceOrAppendData(game),
  });

  useWatch(async () => {
    if (me) return watchGames.execute((games) => replaceAll(games));
  }, [me?.uid]);

  return (
    <Context.Provider
      value={{
        games,
        currentGame,
        fetchingGames,
        imHost,
        createGame,
        changeGame,
        deleteGame,
        startGame,
      }}
    >
      {children}
    </Context.Provider>
  );
};

import { createContext, FC, useCallback, useContext, useEffect } from 'react';

import { GameModel } from '@domain/models';

import {
  ChangeGameUsecase,
  CreateGameUsecase,
  DeleteGameUsecase,
  StartGameUsecase,
  WatchCurrentGameUsecase,
} from '@domain/usecases';

import {
  GameUsecasesContextProviderProps,
  GameUsecasesContextValue,
} from './types';

import { useStates } from '@presentation/hooks';

import { logError } from '@presentation/utils';

import { useUserUsecases } from '..';

const Context = createContext({} as GameUsecasesContextValue);

export const useGameUsecases = (): GameUsecasesContextValue =>
  useContext(Context);

export const GameUsecasesContextProvider: FC<
  GameUsecasesContextProviderProps
> = (props) => {
  const {
    watchCurrentGame,
    getGames,

    children,
  } = props;

  const [s, set] = useStates({
    games: [] as GameModel[],
    currentGame: null as GameModel | null,
    fetchingGames: true,
  });

  const { me } = useUserUsecases();

  useEffect(() => {
    if (!me) {
      set('fetchingGames')(false);
      return;
    }

    set('fetchingGames')(true);

    getGames
      .execute()
      .then(set('games'))
      .catch(logError)
      .finally(set('fetchingGames', false));
  }, [!!me]);

  useEffect(() => {
    if (!me) return;

    let unsubscribe: WatchCurrentGameUsecase.Response;

    watchCurrentGame
      .execute(set('currentGame'))
      .then((value) => (unsubscribe = value))
      .catch(logError);

    return () => unsubscribe?.();
  }, [me?.currentGameID]);

  const createGame = useCallback<CreateGameUsecase['execute']>(
    async (payload: CreateGameUsecase.Payload) => {
      const game = await props.createGame.execute(payload);

      set('games')((prev) => [...prev, game]);

      return game;
    },
    [props.createGame, set],
  );

  const changeGame = useCallback<ChangeGameUsecase['execute']>(
    async (payload: ChangeGameUsecase.Payload) => {
      const game = await props.changeGame.execute(payload);

      set('games')(([...games]) => {
        games.splice(
          games.findIndex((_game) => _game.id === game.id),
          1,
          game,
        );

        return games;
      });
      set('currentGame')(game);

      return game;
    },
    [props.changeGame, set],
  );

  const deleteGame = useCallback<DeleteGameUsecase['execute']>(
    async (id: string) => {
      await props.deleteGame.execute(id);

      set('games')(([...games]) => {
        games.splice(
          games.findIndex((_game) => _game.id === id),
          1,
        );

        return games;
      });
    },
    [props.deleteGame, set],
  );

  const startGame = useCallback<StartGameUsecase['execute']>(async () => {
    const game = await props.startGame.execute();

    set('currentGame')(game);

    return game;
  }, [props.startGame, set]);

  return (
    <Context.Provider
      value={{
        games: s.games,
        fetchingGames: s.fetchingGames,
        currentGame: s.currentGame,
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

import { createContext, FC, useCallback, useContext } from 'react';

import {
  ChangeGameUsecase,
  CreateGameUsecase,
  DeleteGameUsecase,
  GetGamesUsecase,
  GetGameUsecase,
  StartGameUsecase,
  WatchCurrentGameUsecase,
} from '@domain/usecases';

import { useSelector } from '@presentation/hooks';

import { currentGameSelector, myGamesSelector } from '@main/store';

import {
  GameUsecasesContextProviderProps,
  GameUsecasesContextValue,
} from './types';

const Context = createContext({} as GameUsecasesContextValue);

export const useGameUsecases = (): GameUsecasesContextValue =>
  useContext(Context);

export const GameUsecasesContextProvider: FC<
  GameUsecasesContextProviderProps
> = (props) => {
  const { children } = props;

  const myGames = useSelector(myGamesSelector);
  const currentGame = useSelector(currentGameSelector);

  const watchCurrentGame = useCallback(
    (callback: WatchCurrentGameUsecase.Callback = (): any => {}) =>
      props.watchCurrentGame.execute(callback),
    [],
  );

  const fetchGames = useCallback<GetGamesUsecase['execute']>(
    () => props.getGames.execute(),
    [],
  );

  const fetchGame = useCallback<GetGameUsecase['execute']>(
    (id: string) => props.getGame.execute(id),
    [],
  );

  const createGame = useCallback<CreateGameUsecase['execute']>(
    (payload: CreateGameUsecase.Payload) => props.createGame.execute(payload),
    [],
  );

  const changeGame = useCallback<ChangeGameUsecase['execute']>(
    (payload: ChangeGameUsecase.Payload) => props.changeGame.execute(payload),
    [],
  );

  const deleteGame = useCallback<DeleteGameUsecase['execute']>(
    (id: string) => props.deleteGame.execute(id),
    [],
  );

  const startGame = useCallback<StartGameUsecase['execute']>(
    () => props.startGame.execute(),
    [],
  );

  return (
    <Context.Provider
      value={{
        myGames,
        currentGame,
        watchCurrentGame,
        fetchGame,
        fetchGames,
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

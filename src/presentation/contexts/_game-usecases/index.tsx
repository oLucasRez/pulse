import { createContext, FC, useCallback, useContext } from 'react';

import {
  IChangeGameUsecase,
  ICreateGameUsecase,
  IDeleteGameUsecase,
  IGetGamesUsecase,
  IGetGameUsecase,
  IStartGameUsecase,
  IVoteUsecase,
  IWatchCurrentGameUsecase,
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
    (callback: IWatchCurrentGameUsecase.Callback = () => {}) =>
      props.watchCurrentGame.execute(callback),
    [],
  );

  const fetchGames = useCallback<IGetGamesUsecase['execute']>(
    () => props.getGames.execute(),
    [],
  );

  const fetchGame = useCallback<IGetGameUsecase['execute']>(
    (id: string) => props.getGame.execute(id),
    [],
  );

  const createGame = useCallback<ICreateGameUsecase['execute']>(
    (payload: ICreateGameUsecase.Payload) => props.createGame.execute(payload),
    [],
  );

  const changeGame = useCallback<IChangeGameUsecase['execute']>(
    (payload: IChangeGameUsecase.Payload) => props.changeGame.execute(payload),
    [],
  );

  const deleteGame = useCallback<IDeleteGameUsecase['execute']>(
    (id: string) => props.deleteGame.execute(id),
    [],
  );

  const startGame = useCallback<IStartGameUsecase['execute']>(
    () => props.startGame.execute(),
    [],
  );

  const vote = useCallback<IVoteUsecase['execute']>(
    (playerID: string, value: boolean) => props.vote.execute(playerID, value),
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
        vote,
      }}
    >
      {children}
    </Context.Provider>
  );
};

import { createContext, FC, useCallback, useContext } from 'react';

import {
  ChangeGameUsecase,
  CreateGameUsecase,
  DeleteGameUsecase,
  GetGamesUsecase,
  StartGameUsecase,
} from '@domain/usecases';

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

  const fetchGames = useCallback<GetGamesUsecase['execute']>(
    () => props.getGames.execute(),
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

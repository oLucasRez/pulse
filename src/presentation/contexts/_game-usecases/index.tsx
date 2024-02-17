import { createContext, FC, useContext } from 'react';

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
  const {
    getCurrentGame,
    setCurrentGame,
    getGame,
    getGames,
    createGame,
    deleteGame,

    startGame,

    children,
  } = props;

  return (
    <Context.Provider
      value={{
        getCurrentGame,
        setCurrentGame,
        getGame,
        getGames,
        createGame,
        deleteGame,

        startGame,
      }}
    >
      {children}
    </Context.Provider>
  );
};

import { createContext, FC, useContext } from 'react';

import {
  PlayerUsecasesContextProviderProps,
  PlayerUsecasesContextValue,
} from './types';

const Context = createContext({} as PlayerUsecasesContextValue);

export const usePlayerUsecases = (): PlayerUsecasesContextValue =>
  useContext(Context);

export const PlayerUsecasesContextProvider: FC<
  PlayerUsecasesContextProviderProps
> = (props) => {
  const {
    getPlayers,
    watchPlayers,
    createPlayer,
    changePlayer,
    deletePlayer,
    children,
  } = props;

  return (
    <Context.Provider
      value={{
        getPlayers,
        watchPlayers,
        createPlayer,
        changePlayer,
        deletePlayer,
      }}
    >
      {children}
    </Context.Provider>
  );
};
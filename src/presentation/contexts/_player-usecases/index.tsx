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
    getPlayer,
    getMyPlayer,
    getCurrentPlayer,
    watchPlayers,
    watchMyPlayer,
    createPlayer,
    changePlayer,
    deletePlayer,
    banPlayer,

    children,
  } = props;

  return (
    <Context.Provider
      value={{
        getPlayers,
        getPlayer,
        getMyPlayer,
        getCurrentPlayer,
        watchPlayers,
        watchMyPlayer,
        createPlayer,
        changePlayer,
        deletePlayer,
        banPlayer,
      }}
    >
      {children}
    </Context.Provider>
  );
};

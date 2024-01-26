import { createContext, FC, useContext } from 'react';

import { PlayersContextProviderProps, PlayersContextValue } from './types';

const Context = createContext({} as PlayersContextValue);

export const usePlayersContext = (): PlayersContextValue => useContext(Context);

export const PlayersContextProvider: FC<PlayersContextProviderProps> = (
  props,
) => {
  const { create, children } = props;

  return <Context.Provider value={{ create }}>{children}</Context.Provider>;
};

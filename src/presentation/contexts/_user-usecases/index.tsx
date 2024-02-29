import { createContext, FC, useContext } from 'react';

import {
  UserUsecasesContextProviderProps,
  UserUsecasesContextValue,
} from './types';

const Context = createContext({} as UserUsecasesContextValue);

export const useUserUsecases = (): UserUsecasesContextValue =>
  useContext(Context);

export const UserUsecasesContextProvider: FC<
  UserUsecasesContextProviderProps
> = (props) => {
  const {
    getMe,
    watchMe,
    changeMe,
    setCurrentGame,

    children,
  } = props;

  return (
    <Context.Provider
      value={{
        getMe,
        watchMe,
        changeMe,
        setCurrentGame,
      }}
    >
      {children}
    </Context.Provider>
  );
};

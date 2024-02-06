import { createContext, FC, useContext } from 'react';

import {
  AuthUsecasesContextProviderProps,
  AuthUsecasesContextValue,
} from './types';

const Context = createContext({} as AuthUsecasesContextValue);

export const useAuthUsecases = (): AuthUsecasesContextValue =>
  useContext(Context);

export const AuthUsecasesContextProvider: FC<
  AuthUsecasesContextProviderProps
> = (props) => {
  const {
    getMe,
    watchMe,
    changeUser,

    children,
  } = props;

  return (
    <Context.Provider
      value={{
        getMe,
        watchMe,
        changeUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

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
    getCurrentUser,

    children,
  } = props;

  return (
    <Context.Provider
      value={{
        getCurrentUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

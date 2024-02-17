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
    signUpWithCredentials,
    signInWithCredentials,
    signInWithProvider,
    linkWithProvider,
    signInAnonymously,
    signOut,
    getMe,
    watchMe,
    changeMe,

    children,
  } = props;

  return (
    <Context.Provider
      value={{
        signUpWithCredentials,
        signInWithCredentials,
        signInWithProvider,
        linkWithProvider,
        signInAnonymously,
        signOut,
        getMe,
        watchMe,
        changeMe,
      }}
    >
      {children}
    </Context.Provider>
  );
};

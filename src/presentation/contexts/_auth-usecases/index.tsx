import { createContext, FC, useCallback, useContext } from 'react';

import {
  GetMeUsecase,
  LinkWithProviderUsecase,
  SignInAnonymouslyUsecase,
  SignInWithCredentialsUsecase,
  SignInWithProviderUsecase,
  SignOutUsecase,
  SignUpWithCredentialsUsecase,
} from '@domain/usecases';

import { useSelector } from '@presentation/hooks';

import { meSelector } from '@main/store';

import {
  AuthUsecasesContextProviderProps,
  AuthUsecasesContextValue,
} from './types';
import { Provider } from '@domain/types';

const Context = createContext({} as AuthUsecasesContextValue);

export const useAuthUsecases = (): AuthUsecasesContextValue =>
  useContext(Context);

export const AuthUsecasesContextProvider: FC<
  AuthUsecasesContextProviderProps
> = (props) => {
  const { children } = props;

  const me = useSelector(meSelector);

  const fetchMe = useCallback<GetMeUsecase['execute']>(
    () => props.getMe.execute(),
    [],
  );

  const signUpWithCredentials = useCallback<
    SignUpWithCredentialsUsecase['execute']
  >(
    (payload: SignUpWithCredentialsUsecase.Payload) =>
      props.signUpWithCredentials.execute(payload),
    [],
  );

  const signInWithCredentials = useCallback<
    SignInWithCredentialsUsecase['execute']
  >(
    (payload: SignInWithCredentialsUsecase.Payload) =>
      props.signInWithCredentials.execute(payload),
    [],
  );

  const signInWithProvider = useCallback<SignInWithProviderUsecase['execute']>(
    (provider: Provider) => props.signInWithProvider.execute(provider),
    [],
  );

  const linkWithProvider = useCallback<LinkWithProviderUsecase['execute']>(
    (provider: Provider) => props.linkWithProvider.execute(provider),
    [],
  );

  const signInAnonymously = useCallback<SignInAnonymouslyUsecase['execute']>(
    () => props.signInAnonymously.execute(),
    [],
  );

  const signOut = useCallback<SignOutUsecase['execute']>(
    () => props.signOut.execute(),
    [],
  );

  return (
    <Context.Provider
      value={{
        me,
        fetchMe,
        signUpWithCredentials,
        signInWithCredentials,
        signInWithProvider,
        linkWithProvider,
        signInAnonymously,
        signOut,
      }}
    >
      {children}
    </Context.Provider>
  );
};

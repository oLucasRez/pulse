import { createContext, FC, useCallback, useContext } from 'react';

import { Provider } from '@domain/types';
import {
  IGetMeUsecase,
  ILinkWithProviderUsecase,
  ISignInAnonymouslyUsecase,
  ISignInWithCredentialsUsecase,
  ISignInWithProviderUsecase,
  ISignOutUsecase,
  ISignUpWithCredentialsUsecase,
} from '@domain/usecases';

import { useSelector } from '@presentation/hooks';

import { meSelector } from '@main/store';

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
  const { children } = props;

  const me = useSelector(meSelector);

  const fetchMe = useCallback<IGetMeUsecase['execute']>(
    () => props.getMe.execute(),
    [],
  );

  const signUpWithCredentials = useCallback<
    ISignUpWithCredentialsUsecase['execute']
  >(
    (payload: ISignUpWithCredentialsUsecase.Payload) =>
      props.signUpWithCredentials.execute(payload),
    [],
  );

  const signInWithCredentials = useCallback<
    ISignInWithCredentialsUsecase['execute']
  >(
    (payload: ISignInWithCredentialsUsecase.Payload) =>
      props.signInWithCredentials.execute(payload),
    [],
  );

  const signInWithProvider = useCallback<ISignInWithProviderUsecase['execute']>(
    (provider: Provider) => props.signInWithProvider.execute(provider),
    [],
  );

  const linkWithProvider = useCallback<ILinkWithProviderUsecase['execute']>(
    (provider: Provider) => props.linkWithProvider.execute(provider),
    [],
  );

  const signInAnonymously = useCallback<ISignInAnonymouslyUsecase['execute']>(
    () => props.signInAnonymously.execute(),
    [],
  );

  const signOut = useCallback<ISignOutUsecase['execute']>(
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

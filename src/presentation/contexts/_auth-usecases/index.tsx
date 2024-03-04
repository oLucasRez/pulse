import { createContext, FC, useCallback, useContext } from 'react';

import {
  LinkWithProviderUsecase,
  SignInAnonymouslyUsecase,
  SignInWithCredentialsUsecase,
  SignInWithProviderUsecase,
  SignOutUsecase,
  SignUpWithCredentialsUsecase,
} from '@domain/usecases';

import {
  AuthUsecasesContextProviderProps,
  AuthUsecasesContextValue,
} from './types';
import { Provider } from '@domain/types';

import { useStates } from '@presentation/hooks';

const Context = createContext({} as AuthUsecasesContextValue);

export const useAuthUsecases = (): AuthUsecasesContextValue =>
  useContext(Context);

export const AuthUsecasesContextProvider: FC<
  AuthUsecasesContextProviderProps
> = (props) => {
  const { children } = props;

  const [s, set] = useStates({ meVersion: Date.now() });

  const signUpWithCredentials = useCallback<
    SignUpWithCredentialsUsecase['execute']
  >(
    (payload: SignUpWithCredentialsUsecase.Payload) =>
      props.signUpWithCredentials
        .execute(payload)
        .finally(set('meVersion', Date.now())),
    [set, props.signUpWithCredentials],
  );

  const signInWithCredentials = useCallback<
    SignInWithCredentialsUsecase['execute']
  >(
    (payload: SignInWithCredentialsUsecase.Payload) =>
      props.signInWithCredentials
        .execute(payload)
        .finally(set('meVersion', Date.now())),
    [set, props.signInWithCredentials],
  );

  const signInWithProvider = useCallback<SignInWithProviderUsecase['execute']>(
    (provider: Provider) =>
      props.signInWithProvider
        .execute(provider)
        .finally(set('meVersion', Date.now())),
    [set, props.signInWithProvider],
  );

  const linkWithProvider = useCallback<LinkWithProviderUsecase['execute']>(
    (provider: Provider) =>
      props.linkWithProvider
        .execute(provider)
        .finally(set('meVersion', Date.now())),
    [set, props.linkWithProvider],
  );

  const signInAnonymously = useCallback<SignInAnonymouslyUsecase['execute']>(
    () =>
      props.signInAnonymously.execute().finally(set('meVersion', Date.now())),
    [set, props.signInAnonymously],
  );

  const signOut = useCallback<SignOutUsecase['execute']>(
    () => props.signOut.execute().finally(set('meVersion', Date.now())),
    [set, props.signOut],
  );

  return (
    <Context.Provider
      value={{
        signUpWithCredentials,
        signInWithCredentials,
        signInWithProvider,
        linkWithProvider,
        signInAnonymously,
        signOut,

        meVersion: s.meVersion,
      }}
    >
      {children}
    </Context.Provider>
  );
};

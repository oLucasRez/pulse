import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { AuthUsecasesContextProvider } from '@presentation/contexts';

import {
  makeChangeMeUsecase,
  makeGetMeUsecase,
  makeLinkWithProviderUsecase,
  makeSetCurrentGameUsecase,
  makeSignInAnonymouslyUsecase,
  makeSignInWithCredentialsUsecase,
  makeSignInWithProviderUsecase,
  makeSignOutUsecase,
  makeSignUpWithCredentialsUsecase,
  makeWatchMeUsecase,
} from '@main/factories';

export function makeAuthUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const signUpWithCredentials = makeSignUpWithCredentialsUsecase();
  const signInWithCredentials = makeSignInWithCredentialsUsecase();
  const signInWithProvider = makeSignInWithProviderUsecase();
  const linkWithProvider = makeLinkWithProviderUsecase();
  const signInAnonymously = makeSignInAnonymouslyUsecase();
  const signOut = makeSignOutUsecase();
  const getMe = makeGetMeUsecase();
  const watchMe = makeWatchMeUsecase();
  const changeMe = makeChangeMeUsecase();
  const setCurrentGame = makeSetCurrentGameUsecase();

  return (
    <AuthUsecasesContextProvider
      signUpWithCredentials={signUpWithCredentials}
      signInWithCredentials={signInWithCredentials}
      signInWithProvider={signInWithProvider}
      linkWithProvider={linkWithProvider}
      signInAnonymously={signInAnonymously}
      signOut={signOut}
      getMe={getMe}
      watchMe={watchMe}
      changeMe={changeMe}
      setCurrentGame={setCurrentGame}
      {...props}
    />
  );
}

import { ReactElement } from 'react';

import { UserContextProvider } from '@presentation/hooks';
import { ContextProviderProps } from '@presentation/types';

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
} from '@main/factories';

export function makeUserContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getMe = makeGetMeUsecase();
  const signUpWithCredentials = makeSignUpWithCredentialsUsecase();
  const signInWithCredentials = makeSignInWithCredentialsUsecase();
  const signInWithProvider = makeSignInWithProviderUsecase();
  const linkWithProvider = makeLinkWithProviderUsecase();
  const signInAnonymously = makeSignInAnonymouslyUsecase();
  const signOut = makeSignOutUsecase();
  const changeMe = makeChangeMeUsecase();
  const setCurrentGame = makeSetCurrentGameUsecase();

  return (
    <UserContextProvider
      getMe={getMe}
      signUpWithCredentials={signUpWithCredentials}
      signInWithCredentials={signInWithCredentials}
      signInWithProvider={signInWithProvider}
      linkWithProvider={linkWithProvider}
      signInAnonymously={signInAnonymously}
      signOut={signOut}
      changeMe={changeMe}
      setCurrentGame={setCurrentGame}
      {...props}
    />
  );
}

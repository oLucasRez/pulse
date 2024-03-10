import { ReactElement } from 'react';

import { AuthUsecasesContextProvider } from '@presentation/contexts';
import { ContextProviderProps } from '@presentation/types';

import {
  makeGetMeUsecase,
  makeLinkWithProviderUsecase,
  makeSignInAnonymouslyUsecase,
  makeSignInWithCredentialsUsecase,
  makeSignInWithProviderUsecase,
  makeSignOutUsecase,
  makeSignUpWithCredentialsUsecase,
} from '@main/factories';

export function makeAuthUsecasesContextProvider(
  props: ContextProviderProps,
): ReactElement {
  const getMe = makeGetMeUsecase();
  const signUpWithCredentials = makeSignUpWithCredentialsUsecase();
  const signInWithCredentials = makeSignInWithCredentialsUsecase();
  const signInWithProvider = makeSignInWithProviderUsecase();
  const linkWithProvider = makeLinkWithProviderUsecase();
  const signInAnonymously = makeSignInAnonymouslyUsecase();
  const signOut = makeSignOutUsecase();

  return (
    <AuthUsecasesContextProvider
      getMe={getMe}
      signUpWithCredentials={signUpWithCredentials}
      signInWithCredentials={signInWithCredentials}
      signInWithProvider={signInWithProvider}
      linkWithProvider={linkWithProvider}
      signInAnonymously={signInAnonymously}
      signOut={signOut}
      {...props}
    />
  );
}

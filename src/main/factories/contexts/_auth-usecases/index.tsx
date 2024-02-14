import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { AuthUsecasesContextProvider } from '@presentation/contexts';

import {
  makeChangeUserUsecase,
  makeGetMeUsecase,
  makeSignInWithCredentialsUsecase,
  makeSignOutUsecase,
  makeSignUpWithCredentialsUsecase,
  makeWatchMeUsecase,
} from '@main/factories';

export function makeAuthUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const signUpWithCredentials = makeSignUpWithCredentialsUsecase();
  const signInWithCredentials = makeSignInWithCredentialsUsecase();
  const signOut = makeSignOutUsecase();
  const getMe = makeGetMeUsecase();
  const watchMe = makeWatchMeUsecase();
  const changeUser = makeChangeUserUsecase();

  return (
    <AuthUsecasesContextProvider
      signUpWithCredentials={signUpWithCredentials}
      signInWithCredentials={signInWithCredentials}
      signOut={signOut}
      getMe={getMe}
      watchMe={watchMe}
      changeUser={changeUser}
      {...props}
    />
  );
}

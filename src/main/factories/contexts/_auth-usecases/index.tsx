import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { AuthUsecasesContextProvider } from '@presentation/contexts';

import {
  makeChangeUserUsecase,
  makeGetMeUsecase,
  makeSignInWithPasswordUsecase,
  makeSignOutUsecase,
  makeSignUpWithPasswordUsecase,
  makeWatchMeUsecase,
} from '@main/factories';

export function makeAuthUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const signUpWithPassword = makeSignUpWithPasswordUsecase();
  const signInWithPassword = makeSignInWithPasswordUsecase();
  const signOut = makeSignOutUsecase();
  const getMe = makeGetMeUsecase();
  const watchMe = makeWatchMeUsecase();
  const changeUser = makeChangeUserUsecase();

  return (
    <AuthUsecasesContextProvider
      signUpWithPassword={signUpWithPassword}
      signInWithPassword={signInWithPassword}
      signOut={signOut}
      getMe={getMe}
      watchMe={watchMe}
      changeUser={changeUser}
      {...props}
    />
  );
}

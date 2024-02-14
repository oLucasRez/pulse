import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { AuthUsecasesContextProvider } from '@presentation/contexts';

import {
  makeChangeUserUsecase,
  makeGetMeUsecase,
  makeSignInWithPasswordUsecase,
  makeSignUpWithPasswordUsecase,
  makeWatchMeUsecase,
} from '@main/factories';

export function makeAuthUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const signUpWithPassword = makeSignUpWithPasswordUsecase();
  const signInWithPassword = makeSignInWithPasswordUsecase();
  const getMe = makeGetMeUsecase();
  const watchMe = makeWatchMeUsecase();
  const changeUser = makeChangeUserUsecase();

  return (
    <AuthUsecasesContextProvider
      signUpWithPassword={signUpWithPassword}
      signInWithPassword={signInWithPassword}
      getMe={getMe}
      watchMe={watchMe}
      changeUser={changeUser}
      {...props}
    />
  );
}

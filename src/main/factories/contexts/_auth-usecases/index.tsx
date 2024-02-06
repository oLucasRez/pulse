import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { AuthUsecasesContextProvider } from '@presentation/contexts';

import { makeChangeUserUsecase, makeGetMeUsecase } from '@main/factories';

export function makeAuthUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getMe = makeGetMeUsecase();
  const changeUser = makeChangeUserUsecase();

  return (
    <AuthUsecasesContextProvider
      getMe={getMe}
      changeUser={changeUser}
      {...props}
    />
  );
}

import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { AuthUsecasesContextProvider } from '@presentation/contexts';

import {
  makeChangeUserUsecase,
  makeGetMeUsecase,
  makeWatchMeUsecase,
} from '@main/factories';

export function makeAuthUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getMe = makeGetMeUsecase();
  const watchMe = makeWatchMeUsecase();
  const changeUser = makeChangeUserUsecase();

  return (
    <AuthUsecasesContextProvider
      getMe={getMe}
      watchMe={watchMe}
      changeUser={changeUser}
      {...props}
    />
  );
}

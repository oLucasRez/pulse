import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { AuthUsecasesContextProvider } from '@presentation/contexts';

import { makeGetCurrentUserUsecase } from '@main/factories';

export function makeAuthUsecasesContextProvider(
  props: ContextProviderProps,
): ReactNode {
  const getCurrentUser = makeGetCurrentUserUsecase();

  return (
    <AuthUsecasesContextProvider getCurrentUser={getCurrentUser} {...props} />
  );
}

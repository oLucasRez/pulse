import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { SessionContextProvider } from '@presentation/contexts';

export function makeSessionContextProvider(
  props: ContextProviderProps,
): ReactNode {
  return <SessionContextProvider {...props} />;
}

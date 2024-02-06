import { ReactNode } from 'react';

import { ContextProviderProps } from '@presentation/types';

import { CreatePlayerModalContextProvider } from '@presentation/contexts';

export function makeCreatePlayerModalContextProvider(
  props: ContextProviderProps,
): ReactNode {
  return <CreatePlayerModalContextProvider {...props} />;
}

import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';

import { AuthProxy, CreatePlayerProxy } from '@presentation/pages/_game';

const GamePage = lazy(() => import('@presentation/pages/_game'));

export function makeGamePage(): ReactElement {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <AuthProxy>
        <CreatePlayerProxy>
          <GamePage />
        </CreatePlayerProxy>
      </AuthProxy>
    </Suspense>
  );
}

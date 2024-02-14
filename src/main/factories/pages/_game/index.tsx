import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';

import { CreatePlayerProxy } from '@presentation/pages/_game';

const GamePage = lazy(() => import('@presentation/pages/_game'));

export function makeGamePage(): ReactElement {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <CreatePlayerProxy>
        <GamePage />
      </CreatePlayerProxy>
    </Suspense>
  );
}

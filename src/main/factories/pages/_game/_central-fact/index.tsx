import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';

const CentralFactPage = lazy(
  () => import('@presentation/pages/_game/pages/_central-fact'),
);

export function makeCentralFactPage(): ReactElement {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <CentralFactPage />
    </Suspense>
  );
}

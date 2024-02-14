import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';

const HomePage = lazy(() => import('@presentation/pages/_home'));

export function makeHomePage(): ReactElement {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <HomePage />
    </Suspense>
  );
}

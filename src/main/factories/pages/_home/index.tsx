import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';

import {
  makeAuthUsecasesContextProvider,
  makeGameUsecasesContextProvider,
  makeUserUsecasesContextProvider,
} from '@main/factories';

const HomePage = lazy(() => import('@presentation/pages/_home'));

export function makeHomePage(): ReactElement {
  const page = [
    // inner
    makeGameUsecasesContextProvider,
    makeUserUsecasesContextProvider,
    makeAuthUsecasesContextProvider,
    // outer
  ].reduce<ReactElement>(
    (children, wrapper) => wrapper({ children }),
    <Suspense fallback={<GlobalLoading />}>
      <HomePage />
    </Suspense>,
  );

  return page;
}

import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';

import { makeAuthUsecasesContextProvider } from '@main/factories';

const LoginPage = lazy(() => import('@presentation/pages/_login'));

export function makeLoginPage(): ReactElement {
  const page = [
    // inner
    makeAuthUsecasesContextProvider,
    // outer
  ].reduce<ReactElement>(
    (children, wrapper) => wrapper({ children }),
    <Suspense fallback={<GlobalLoading />}>
      <LoginPage />
    </Suspense>,
  );

  return page;
}

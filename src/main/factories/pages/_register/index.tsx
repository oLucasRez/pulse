import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';

import { makeAuthUsecasesContextProvider } from '@main/factories';

const RegisterPage = lazy(() => import('@presentation/pages/_register'));

export function makeRegisterPage(): ReactElement {
  const page = [
    // inner
    makeAuthUsecasesContextProvider,
    // outer
  ].reduce<ReactElement>(
    (children, wrapper) => wrapper({ children }),
    <Suspense fallback={<GlobalLoading />}>
      <RegisterPage />
    </Suspense>,
  );

  return page;
}

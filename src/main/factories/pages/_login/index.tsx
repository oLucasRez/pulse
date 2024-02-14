import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';

const LoginPage = lazy(() => import('@presentation/pages/_login'));

export function makeLoginPage(): ReactElement {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <LoginPage />
    </Suspense>
  );
}

import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';

const RegisterPage = lazy(() => import('@presentation/pages/_register'));

export function makeRegisterPage(): ReactElement {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <RegisterPage />
    </Suspense>
  );
}

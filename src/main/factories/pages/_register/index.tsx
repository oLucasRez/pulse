import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';
import { WithoutSessionProxy } from '@presentation/proxies';

const RegisterPage = lazy(() => import('@presentation/pages/_register'));

export function makeRegisterPage(): ReactElement {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <WithoutSessionProxy>
        <RegisterPage />
      </WithoutSessionProxy>
    </Suspense>
  );
}

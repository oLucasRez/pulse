import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';
import { WithoutSessionProxy } from '@presentation/proxies';

const LoginPage = lazy(() => import('@presentation/pages/_login'));

export function makeLoginPage(): ReactElement {
  return (
    <Suspense fallback={<GlobalLoading />}>
      <WithoutSessionProxy>
        <LoginPage />
      </WithoutSessionProxy>
    </Suspense>
  );
}

import { lazy, ReactElement, Suspense } from 'react';

import { GlobalLoading } from '@presentation/components';
import { WithSessionProxy } from '@presentation/pages/_home/proxies';

import {
  makeGameContextProvider,
  makeUserContextProvider,
} from '@main/factories';

const HomePage = lazy(() => import('@presentation/pages/_home'));

export function makeHomePage(): ReactElement {
  const page = [
    // inner
    makeGameContextProvider,
    makeUserContextProvider,
    // outer
  ].reduce<ReactElement>(
    (children, wrapper) => wrapper({ children }),
    <Suspense fallback={<GlobalLoading />}>
      <WithSessionProxy>
        <HomePage />
      </WithSessionProxy>
    </Suspense>,
  );

  return page;
}

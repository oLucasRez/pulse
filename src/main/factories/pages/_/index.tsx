import { RootPage } from '@presentation/pages/_';
import { ReactElement } from 'react';

import { SessionFetchedProxy } from '@presentation/proxies';

import { makeAuthUsecasesContextProvider } from '@main/factories';

export function makeRootPage(): ReactElement {
  const page = [
    // inner
    makeAuthUsecasesContextProvider,
    // outer
  ].reduce<ReactElement>(
    (children, wrapper) => wrapper({ children }),
    <SessionFetchedProxy>
      <RootPage />
    </SessionFetchedProxy>,
  );

  return page;
}

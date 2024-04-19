import { ReactElement } from 'react';

import { RootPage } from '@presentation/pages/_';
import { SessionFetchedProxy } from '@presentation/proxies';

import { makeUserContextProvider } from '@main/factories';

export function makeRootPage(): ReactElement {
  const page = [
    // inner
    makeUserContextProvider,
    // outer
  ].reduce<ReactElement>(
    (children, wrapper) => wrapper({ children }),
    <SessionFetchedProxy>
      <RootPage />
    </SessionFetchedProxy>,
  );

  return page;
}

import { ReactElement } from 'react';

import LogoutPage from '@presentation/pages/_logout';

import { makeUserContextProvider } from '@main/factories';

export function makeLogoutPage(): ReactElement {
  const page = [
    // inner
    makeUserContextProvider,
    // outer
  ].reduce<ReactElement>(
    (children, wrapper) => wrapper({ children }),
    <LogoutPage />,
  );

  return page;
}

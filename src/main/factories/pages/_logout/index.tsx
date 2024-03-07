import { ReactElement } from 'react';

import LogoutPage from '@presentation/pages/_logout';

import { makeAuthUsecasesContextProvider } from '@main/factories';

export function makeLogoutPage(): ReactElement {
  const page = [
    // inner
    makeAuthUsecasesContextProvider,
    // outer
  ].reduce<ReactElement>(
    (children, wrapper) => wrapper({ children }),
    <LogoutPage />,
  );

  return page;
}

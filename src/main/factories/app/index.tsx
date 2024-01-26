import { ReactNode } from 'react';

import { makePlayerUsecasesContextProvider } from '../contexts';

import { App } from '@presentation/app';

export function makeApp(): ReactNode {
  const app = [
    // outer
    makePlayerUsecasesContextProvider,
    // inner
  ].reduce<ReactNode>((children, wrapper) => wrapper({ children }), <App />);

  return app;
}

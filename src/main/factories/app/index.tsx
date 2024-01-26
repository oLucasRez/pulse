import { ReactNode } from 'react';

import { makePlayersContextProvider } from '../contexts';

import { App } from '@presentation/app';

export function makeApp(): ReactNode {
  const app = [
    // outer
    makePlayersContextProvider,
    // inner
  ].reduce<ReactNode>((children, wrapper) => wrapper({ children }), <App />);

  return app;
}

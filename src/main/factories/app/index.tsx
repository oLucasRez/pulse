import { ReactNode } from 'react';

import {
  makeDiceUsecasesContextProvider,
  makePlayerUsecasesContextProvider,
} from '../contexts';

import { App } from '@presentation/app';

export function makeApp(): ReactNode {
  const app = [
    // outer
    makeDiceUsecasesContextProvider,
    makePlayerUsecasesContextProvider,
    // inner
  ].reduce<ReactNode>((children, wrapper) => wrapper({ children }), <App />);

  return app;
}

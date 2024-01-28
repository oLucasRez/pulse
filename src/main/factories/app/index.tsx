import { ReactNode } from 'react';

import {
  makeDiceUsecasesContextProvider,
  makeGameUsecasesContextProvider,
  makePlayerUsecasesContextProvider,
} from '../contexts';

import { App } from '@presentation/app';

export function makeApp(): ReactNode {
  const app = [
    // inner
    makePlayerUsecasesContextProvider,
    makeDiceUsecasesContextProvider,
    makeGameUsecasesContextProvider,
    // outer
  ].reduce<ReactNode>((children, wrapper) => wrapper({ children }), <App />);

  return app;
}

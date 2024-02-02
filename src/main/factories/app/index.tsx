import { ReactNode } from 'react';

import {
  makeCentralFactUsecasesContextProvider,
  makeCentralPulseUsecasesContextProvider,
  makeDiceUsecasesContextProvider,
  makeGameUsecasesContextProvider,
  makePlayerUsecasesContextProvider,
} from '../contexts';

import { App } from '@presentation/app';

export function makeApp(): ReactNode {
  const app = [
    // inner
    makeCentralFactUsecasesContextProvider,
    makeCentralPulseUsecasesContextProvider,
    makePlayerUsecasesContextProvider,
    makeDiceUsecasesContextProvider,
    makeGameUsecasesContextProvider,
    // outer
  ].reduce<ReactNode>((children, wrapper) => wrapper({ children }), <App />);

  return app;
}

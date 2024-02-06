import { GlobalStyle } from '@presentation/styles';
import { ReactNode } from 'react';

import {
  makeAuthUsecasesContextProvider,
  makeCentralFactUsecasesContextProvider,
  makeCentralPulseUsecasesContextProvider,
  makeCreatePlayerModalContextProvider,
  makeDiceUsecasesContextProvider,
  makeGameUsecasesContextProvider,
  makePlayerUsecasesContextProvider,
} from '../contexts';

import { App } from '@presentation/app';

export function makeApp(): ReactNode {
  const app = [
    // inner
    makeCreatePlayerModalContextProvider,

    makeCentralFactUsecasesContextProvider,
    makeCentralPulseUsecasesContextProvider,
    makePlayerUsecasesContextProvider,
    makeDiceUsecasesContextProvider,
    makeGameUsecasesContextProvider,
    makeAuthUsecasesContextProvider,
    // outer
  ].reduce<ReactNode>(
    (children, wrapper) => wrapper({ children }),
    <>
      <GlobalStyle />
      <App />
    </>,
  );

  return app;
}

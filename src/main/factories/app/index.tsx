import { ReactNode } from 'react';

import {
  makeAuthUsecasesContextProvider,
  makeCentralFactUsecasesContextProvider,
  makeCentralPulseUsecasesContextProvider,
  makeDiceUsecasesContextProvider,
  makeGameUsecasesContextProvider,
  makePlayerUsecasesContextProvider,
} from '../contexts';

import { GlobalStyle } from '@presentation/styles';

import { makeRouter } from '..';

export function makeApp(): ReactNode {
  const app = [
    // inner
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
      {makeRouter()}
    </>,
  );

  return app;
}

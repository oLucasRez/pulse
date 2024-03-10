import { ReactNode } from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';

import { GlobalStyle } from '@presentation/styles';

import { store } from '@main/store';

import { makeRouter } from '..';

export function makeApp(): ReactNode {
  return (
    <ReactReduxProvider store={store}>
      <GlobalStyle />
      {makeRouter()}
    </ReactReduxProvider>
  );
}

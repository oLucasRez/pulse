import { ReactNode } from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';

import { GlobalStyle } from '@presentation/styles';

import { store } from '@main/store';

import { makePlayerPublisher, makeRouter, makeStorePlayerSubscriber } from '..';

export function makeApp(): ReactNode {
  const storePlayerSubscriber = makeStorePlayerSubscriber();
  const playerPublisher = makePlayerPublisher();
  playerPublisher.subscribe(storePlayerSubscriber);

  return (
    <ReactReduxProvider store={store}>
      <GlobalStyle />
      {makeRouter()}
    </ReactReduxProvider>
  );
}

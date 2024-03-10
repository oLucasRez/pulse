import { ReactNode } from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';

import { GlobalStyle } from '@presentation/styles';

import { store } from '@main/store';

import {
  makeGamePublisher,
  makePlayerPublisher,
  makeRouter,
  makeStoreGameSubscriber,
  makeStorePlayerSubscriber,
} from '..';

export function makeApp(): ReactNode {
  const storeGameSubscriber = makeStoreGameSubscriber();
  const gamePublisher = makeGamePublisher();
  gamePublisher.subscribe(storeGameSubscriber);

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

import { ReactNode } from 'react';
import { Provider as ReactReduxProvider } from 'react-redux';

import { GlobalStyle } from '@presentation/styles';

import { store } from '@main/store';

import {
  makeAuthPublisher,
  makeGamePublisher,
  makePlayerPublisher,
  makeRouter,
  makeStoreAuthSubscriber,
  makeStoreGameSubscriber,
  makeStorePlayerSubscriber,
} from '..';

export function makeApp(): ReactNode {
  const storeAuthSubscriber = makeStoreAuthSubscriber();
  const authPublisher = makeAuthPublisher();
  authPublisher.subscribe(storeAuthSubscriber);

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

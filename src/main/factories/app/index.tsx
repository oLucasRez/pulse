import { ReactNode } from 'react';

import { GlobalStyle } from '@presentation/styles';

import {
  makeAuthPublisher,
  makeGamePublisher,
  makePlayerPublisher,
  makeRouter,
  makeSignalAuthSubscriber,
  makeSignalGameSubscriber,
  makeSignalPlayerSubscriber,
} from '..';

export function makeApp(): ReactNode {
  const signalAuthSubscriber = makeSignalAuthSubscriber();
  const authPublisher = makeAuthPublisher();
  authPublisher.subscribe(signalAuthSubscriber);

  const signalGameSubscriber = makeSignalGameSubscriber();
  const gamePublisher = makeGamePublisher();
  gamePublisher.subscribe(signalGameSubscriber);

  const signalPlayerSubscriber = makeSignalPlayerSubscriber();
  const playerPublisher = makePlayerPublisher();
  playerPublisher.subscribe(signalPlayerSubscriber);

  return (
    <>
      <GlobalStyle />
      {makeRouter()}
    </>
  );
}

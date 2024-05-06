import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { GlobalStyle } from '@presentation/styles';

import { ToastContainer } from './styles';

import { makeRouter } from '..';

const queryClient = new QueryClient();

export function makeApp(): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      {makeRouter()}
      <ToastContainer />
    </QueryClientProvider>
  );
}

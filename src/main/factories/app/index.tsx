import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { GlobalStyle, Theme } from '@presentation/styles';

import { ToastContainer } from './styles';

import { makeRouter } from '..';

const queryClient = new QueryClient();

export function makeApp(): ReactNode {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme>
        <GlobalStyle />
        {makeRouter()}
        <ToastContainer />
      </Theme>
    </QueryClientProvider>
  );
}

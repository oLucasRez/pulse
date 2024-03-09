import { FC } from 'react';

import { useAuthUsecases } from '@presentation/contexts';

import { Navigate } from '@presentation/components';

import { WithoutSessionProxyProps } from './types';

export const WithoutSessionProxy: FC<WithoutSessionProxyProps> = (props) => {
  const { children } = props;

  const { me } = useAuthUsecases();

  if (me) return <Navigate.toHome />;

  return children;
};

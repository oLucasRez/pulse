import { FC } from 'react';

import { useAuthUsecases } from '@presentation/contexts';

import { Navigate } from '@presentation/components';

import { WithSessionProxyProps } from './types';

export const WithSessionProxy: FC<WithSessionProxyProps> = (props) => {
  const { children } = props;

  const { me } = useAuthUsecases();

  if (!me) return <Navigate.toLogin />;

  return children;
};

import { FC } from 'react';

import { Navigate } from '@presentation/components';
import { useUser } from '@presentation/hooks';

import { WithSessionProxyProps } from './types';

export const WithSessionProxy: FC<WithSessionProxyProps> = (props) => {
  const { children } = props;

  const { me } = useUser();

  if (!me) return <Navigate.toLogin />;

  return children;
};

import { FC } from 'react';

import { GlobalLoading, Navigate } from '@presentation/components';
import { useUser } from '@presentation/hooks';

import { WithoutSessionProxyProps } from './types';

export const WithoutSessionProxy: FC<WithoutSessionProxyProps> = (props) => {
  const { children } = props;

  const { me, fetchingMe } = useUser();

  if (fetchingMe) return <GlobalLoading />;

  if (me) return <Navigate.toHome />;

  return children;
};

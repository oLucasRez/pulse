import { FC } from 'react';

import { GlobalLoading, Navigate } from '@presentation/components';
import { useUser } from '@presentation/hooks';

import { SessionFetchedProxyProps } from './types';

export const SessionFetchedProxy: FC<SessionFetchedProxyProps> = (props) => {
  const { children } = props;

  const { fetchingMe, error } = useUser();

  if (fetchingMe) return <GlobalLoading />;

  if (error) return <Navigate.toLogin />;

  return children;
};

import { FC, useEffect } from 'react';

import { GlobalLoading } from '@presentation/components';
import { useAuthUsecases } from '@presentation/contexts';
import { useNavigate, useStates } from '@presentation/hooks';

import { SessionFetchedProxyProps } from './types';

export const SessionFetchedProxy: FC<SessionFetchedProxyProps> = (props) => {
  const { children } = props;

  const [s, set] = useStates({ fetchingMe: true });

  const { navigateToLogin } = useNavigate();

  const { fetchMe } = useAuthUsecases();

  useEffect(() => {
    fetchMe().catch(navigateToLogin).finally(set('fetchingMe', false));
  }, []);

  if (s.fetchingMe) return <GlobalLoading />;

  return children;
};

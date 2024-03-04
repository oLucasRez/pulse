import { FC, useEffect } from 'react';

import { useNavigate } from '@presentation/hooks';

import { useAuthUsecases } from '@presentation/contexts';

import { GlobalLoading } from '@presentation/components';

import { logError } from '@presentation/utils';

const LogoutPage: FC = () => {
  const { navigateToLogin } = useNavigate();

  const { signOut } = useAuthUsecases();

  useEffect(() => {
    signOut().catch(logError).finally(navigateToLogin);
  }, []);

  return <GlobalLoading />;
};

export default LogoutPage;

import { FC, useEffect } from 'react';

import { GlobalLoading } from '@presentation/components';
import { useAuthUsecases } from '@presentation/contexts';
import { useNavigate } from '@presentation/hooks';
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

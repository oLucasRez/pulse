import { FC, useEffect } from 'react';

import { GlobalLoading } from '@presentation/components';
import { useNavigate, useUser } from '@presentation/hooks';
import { logError } from '@presentation/utils';

const LogoutPage: FC = () => {
  const { navigateToLogin } = useNavigate();

  const { signOut } = useUser();

  useEffect(() => {
    signOut().catch(logError).finally(navigateToLogin);
  }, []);

  return <GlobalLoading />;
};

export default LogoutPage;

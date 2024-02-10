import { FC, useEffect } from 'react';

import { useNavigate } from '@presentation/hooks';

import { GlobalLoading } from '@presentation/components';

const LogoutPage: FC = () => {
  const { navigateToLogin } = useNavigate();

  useEffect(() => {
    localStorage.removeItem('session');
    navigateToLogin();
  }, []);

  return <GlobalLoading />;
};

export default LogoutPage;

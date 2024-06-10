import { FC, useEffect } from 'react';

import { AuthForm, GlobalLoading } from '@presentation/components';
import { useNavigate, useUser } from '@presentation/hooks';

import { Container } from './styles';

const LoginPage: FC = () => {
  const { navigateToHome, navigateToRegister } = useNavigate();

  // @temporary
  const { signInAnonymously } = useUser();
  useEffect(() => {
    signInAnonymously();
  }, []);
  return <GlobalLoading />;

  return (
    <Container>
      <AuthForm
        mode='login'
        onAuth={navigateToHome}
        onWantToRegister={navigateToRegister}
      />
    </Container>
  );
};

export default LoginPage;

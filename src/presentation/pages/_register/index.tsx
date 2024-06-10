import { FC, useEffect } from 'react';

import { AuthForm, GlobalLoading } from '@presentation/components';
import { useNavigate, useUser } from '@presentation/hooks';

import { Container } from './styles';

const RegisterPage: FC = () => {
  const { navigateToHome, navigateToLogin } = useNavigate();

  // @temporary
  const { signInAnonymously } = useUser();
  useEffect(() => {
    signInAnonymously();
  }, []);
  return <GlobalLoading />;

  return (
    <Container>
      <AuthForm
        mode='register'
        onAuth={navigateToHome}
        onWantToLogin={navigateToLogin}
      />
    </Container>
  );
};

export default RegisterPage;

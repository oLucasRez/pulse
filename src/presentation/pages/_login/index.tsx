import { FC } from 'react';

import { AuthForm } from '@presentation/components';
import { useNavigate } from '@presentation/hooks';

import { Container } from './styles';

const LoginPage: FC = () => {
  const { navigateToHome, navigateToRegister } = useNavigate();

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

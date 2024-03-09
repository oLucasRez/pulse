import { FC } from 'react';

import { useNavigate } from '@presentation/hooks';

import { AuthForm } from '@presentation/components';

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

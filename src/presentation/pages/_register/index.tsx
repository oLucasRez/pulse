import { FC } from 'react';

import { AuthForm } from '@presentation/components';
import { useNavigate } from '@presentation/hooks';

import { Container } from './styles';

const RegisterPage: FC = () => {
  const { navigateToHome, navigateToLogin } = useNavigate();

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

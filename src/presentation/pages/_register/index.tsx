import { FC } from 'react';

import { useNavigate } from '@presentation/hooks';

import { AuthForm } from '@presentation/components';

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

export { registerLoader } from './loader';

export default RegisterPage;

import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { DomainError } from '@domain/errors';

import { useNavigate, useStates } from '@presentation/hooks';

import {
  useAuthUsecases,
  useGameUsecases,
  useUserUsecases,
} from '@presentation/contexts';

import { AuthForm, GlobalLoading } from '@presentation/components';

import { Container } from './styles';

import { logError } from '@presentation/utils';

import { AuthProxyProps } from './types';

export const AuthProxy: FC<AuthProxyProps> = (props) => {
  const { children } = props;

  const [s, set] = useStates({
    authFormMode: 'login' as AuthForm.Mode,
  });

  const { setCurrentGame } = useUserUsecases();

  const { navigateToHome } = useNavigate();

  const params = useParams();

  async function handleAuth(): Promise<any> {
    if (!params.id) return;

    await setCurrentGame(params.id).catch((error: DomainError) => {
      logError(error);
      navigateToHome();
    });
  }

  useEffect(() => {
    handleAuth();
  }, []);

  const { me } = useAuthUsecases();

  const { currentGame } = useGameUsecases();

  if (!currentGame) return <GlobalLoading />;

  if (!me)
    return (
      <Container>
        <AuthForm
          mode={s.authFormMode}
          onAuth={handleAuth}
          onWantToLogin={set('authFormMode', 'login')}
          onWantToRegister={set('authFormMode', 'register')}
        />
      </Container>
    );

  return children;
};

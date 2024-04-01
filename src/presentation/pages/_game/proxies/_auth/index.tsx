import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { DomainError } from '@domain/errors';
import { GameModel } from '@domain/models';

import { AuthForm, GlobalLoading } from '@presentation/components';
import {
  useAuthUsecases,
  useGameUsecases,
  useUserUsecases,
} from '@presentation/contexts';
import { useNavigate, useStates } from '@presentation/hooks';
import { logError } from '@presentation/utils';

import { Container } from './styles';

import { AuthProxyProps } from './types';

export const AuthProxy: FC<AuthProxyProps> = (props) => {
  const { children } = props;

  const [s, set] = useStates({
    currentGame: null as GameModel | null,
    authFormMode: 'login' as AuthForm.Mode,
  });

  const { setCurrentGame } = useUserUsecases();

  const { fetchGame } = useGameUsecases();

  const { navigateToHome } = useNavigate();

  const params = useParams();

  async function handleAuth() {
    if (!params.id) return;

    setCurrentGame(params.id).catch((error: DomainError) => {
      logError(error);
      navigateToHome();
    });

    fetchGame(params.id)
      .then(set('currentGame'))
      .catch((error: DomainError) => {
        logError(error);
        navigateToHome();
      });
  }

  const { me } = useAuthUsecases();

  useEffect(() => {
    if (me) handleAuth();
  }, [!me]);

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

  if (!s.currentGame) return <GlobalLoading />;

  return children;
};

import { FC, useEffect } from 'react';

import { authSignals } from '@presentation/signals';

import { useStates } from '@presentation/hooks';

import { useUserUsecases } from '@presentation/contexts';

import { AuthForm, GlobalLoading } from '@presentation/components';

import { Container } from './styles';

import { logError } from '@presentation/utils';

import { AuthProxyProps } from './types';

import { useGameLoaderData } from '../../loader';

const { me, initialized } = authSignals;

export const AuthProxy: FC<AuthProxyProps> = (props) => {
  const { children } = props;

  const currentGame = useGameLoaderData();

  const [s, set] = useStates({
    authFormMode: 'login' as AuthForm.Mode,
  });

  const { setCurrentGame } = useUserUsecases();

  async function handleAuth(): Promise<any> {
    await setCurrentGame(currentGame.id).catch(logError);
  }

  useEffect(() => {
    handleAuth();
  }, []);

  if (!initialized.value) return <GlobalLoading />;

  if (!me.value)
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

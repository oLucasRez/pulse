import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AuthForm, GlobalLoading } from '@presentation/components';
import { useNavigate, useStates, useUser } from '@presentation/hooks';
import { logError } from '@presentation/utils';

import { Container } from './styles';

import { AuthProxyProps } from './types';

export const AuthProxy: FC<AuthProxyProps> = (props) => {
  const { children } = props;

  const [s, set] = useStates({
    settingCurrentGame: true,
    authFormMode: 'login' as AuthForm.Mode,
  });

  const { me, fetchingMe, setCurrentGame } = useUser();

  const { navigateToHome } = useNavigate();

  const params = useParams();

  async function handleAuth() {
    if (!params.gameID) return;

    s.settingCurrentGame = true;
    setCurrentGame(params.gameID)
      .catch((err) => {
        logError(err);
        navigateToHome();
      })
      .finally(set('settingCurrentGame', false));
  }

  useEffect(() => {
    if (me) handleAuth();
  }, [!me]);

  if (fetchingMe) return <GlobalLoading />;

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

  if (s.settingCurrentGame) return <GlobalLoading />;

  return children;
};

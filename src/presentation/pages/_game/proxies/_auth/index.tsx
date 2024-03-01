import { createContext, FC, useContext, useEffect } from 'react';

import { UserModel } from '@domain/models';

import { AuthProxyProps, MeContextValue } from './types';

import { useStates } from '@presentation/hooks';

import { useUserUsecases } from '@presentation/contexts';

import { AuthForm, GlobalLoading } from '@presentation/components';

import { Container } from './styles';

import { logError } from '@presentation/utils';

import { useGameLoaderData } from '../../loader';

const Context = createContext({} as MeContextValue);

export function useMe(): UserModel {
  const { me } = useContext(Context);

  return me;
}

export const AuthProxy: FC<AuthProxyProps> = (props) => {
  const { children } = props;

  const currentGame = useGameLoaderData();

  const [s, set] = useStates({
    gettingMe: true,
    me: null as UserModel | null,
    authFormMode: 'login' as AuthForm.Mode,
  });

  const { getMe, setCurrentGame } = useUserUsecases();

  async function handleAuth(me: UserModel | null): Promise<any> {
    set('gettingMe')(true);

    await setCurrentGame
      .execute(currentGame.id)
      .then(set('me', me))
      .catch(logError)
      .finally(set('gettingMe', false));
  }

  useEffect(() => {
    set('gettingMe')(true);

    getMe.execute().then(handleAuth).catch(logError);
  }, []);

  if (s.gettingMe) return <GlobalLoading />;

  if (!s.me)
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

  return <Context.Provider value={{ me: s.me }}>{children}</Context.Provider>;
};

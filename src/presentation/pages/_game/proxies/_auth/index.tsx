import { createContext, FC, useContext, useEffect } from 'react';

import { UserModel } from '@domain/models';

import { AuthProxyProps, MeContextValue } from './types';

import { useStates } from '@presentation/hooks';

import { useAuthUsecases, useGameUsecases } from '@presentation/contexts';

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

  const s = useStates({
    gettingMe: true,
    me: null as UserModel | null,
    authFormMode: 'login' as AuthForm.Mode,
  });
  const gettingMe = (): any => (s.gettingMe = true);
  const gotMe = (): any => (s.gettingMe = false);

  const setMe = (me: UserModel | null): any => (s.me = me);

  const changeToLoginMode = (): any => (s.authFormMode = 'login');
  const changeToRegisterMode = (): any => (s.authFormMode = 'register');

  const { getMe } = useAuthUsecases();

  useEffect(() => {
    gettingMe();

    getMe.execute().then(setMe).catch(logError).finally(gotMe);
  }, []);

  const { setCurrentGame } = useGameUsecases();

  function handleAuth(me: UserModel): any {
    gettingMe();

    setCurrentGame
      .execute(currentGame.id)
      .then(() => setMe(me))
      .catch(logError)
      .finally(gotMe);
  }

  if (s.gettingMe) return <GlobalLoading />;

  if (!s.me)
    return (
      <Container>
        <AuthForm
          mode={s.authFormMode}
          onAuth={handleAuth}
          onWantToLogin={changeToLoginMode}
          onWantToRegister={changeToRegisterMode}
        />
      </Container>
    );

  return <Context.Provider value={{ me: s.me }}>{children}</Context.Provider>;
};

import { useCallback, useMemo } from 'react';
import { useNavigate as useDefaultNavigate } from 'react-router-dom';

import { LinkProps, NavigateHookReturn } from './types';

function replaceIfIsLogout(): boolean {
  return location.pathname === '/logout';
}

export function useNavigate(): NavigateHookReturn {
  const navigate = useDefaultNavigate();

  const navigateToHome = useCallback(
    () => navigate('/', { replace: replaceIfIsLogout() }),
    [navigate],
  );

  const linkToHomeProps = useMemo<LinkProps>(
    () => ({
      to: '/',
      replace: replaceIfIsLogout(),
    }),
    [],
  );

  const navigateToGame = useCallback(
    (id: string) => navigate(`/game/${id}`, { replace: replaceIfIsLogout() }),
    [navigate],
  );

  const navigateToLogin = useCallback(
    () => navigate('/login', { replace: replaceIfIsLogout() }),
    [navigate],
  );

  const linkToLoginProps = useMemo<LinkProps>(
    () => ({
      to: '/login',
      replace: replaceIfIsLogout(),
    }),
    [],
  );

  const navigateToRegister = useCallback(
    () => navigate('/register', { replace: replaceIfIsLogout() }),
    [navigate],
  );

  const linkToRegisterProps = useMemo<LinkProps>(
    () => ({
      to: '/register',
      replace: replaceIfIsLogout(),
    }),
    [],
  );

  const navigateToLogout = useCallback(() => navigate('/logout'), [navigate]);

  const reloadWindow = useCallback(() => location.reload(), []);

  return {
    navigateToHome,
    navigateToGame,
    navigateToLogin,
    navigateToRegister,
    navigateToLogout,
    reloadWindow,

    linkToHomeProps,
    linkToLoginProps,
    linkToRegisterProps,
  };
}

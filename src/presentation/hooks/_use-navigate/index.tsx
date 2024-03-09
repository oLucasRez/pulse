import { useCallback } from 'react';
import { useNavigate as useDefaultNavigate } from 'react-router-dom';

import { NavigateHookReturn } from './types';

function replaceIfIsLogout(): boolean {
  return location.pathname === '/logout';
}

export function useNavigate(): NavigateHookReturn {
  const navigate = useDefaultNavigate();

  const navigateToHome = useCallback(
    () => navigate('/', { replace: replaceIfIsLogout() }),
    [navigate],
  );

  const navigateToGame = useCallback(
    (id: string) => navigate(`/game/${id}`, { replace: replaceIfIsLogout() }),
    [navigate],
  );

  const navigateToLogin = useCallback(
    () => navigate('/login', { replace: replaceIfIsLogout() }),
    [navigate],
  );

  const navigateToRegister = useCallback(
    () => navigate('/register', { replace: replaceIfIsLogout() }),
    [navigate],
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
  };
}

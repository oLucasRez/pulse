import { useCallback } from 'react';
import { useNavigate as useDefaultNavigate, useParams } from 'react-router-dom';

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

  const params = useParams();

  const navigateToGame = useCallback(
    (id: string | undefined = params.gameID) =>
      navigate(id ? `/game/${id}` : '/', { replace: replaceIfIsLogout() }),
    [navigate, params.gameID],
  );

  const navigateToSubject = useCallback(
    (id?: string) =>
      params.gameID &&
      navigate(`/game/${params.gameID}/subject${id ? `/${id}` : ''}`, {
        replace: replaceIfIsLogout(),
      }),
    [navigate, params.gameID],
  );

  const navigateToCentralFact = useCallback(
    () =>
      params.gameID &&
      navigate(`/game/${params.gameID}/central-fact`, {
        replace: replaceIfIsLogout(),
      }),
    [navigate, params.gameID],
  );

  const navigateToInvestigation = useCallback(
    (id?: string) =>
      params.gameID &&
      navigate(`/game/${params.gameID}/investigation${id ? `/${id}` : ''}`, {
        replace: replaceIfIsLogout(),
      }),
    [navigate, params.gameID],
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
    navigateToSubject,
    navigateToCentralFact,
    navigateToInvestigation,
    navigateToLogin,
    navigateToRegister,
    navigateToLogout,
    reloadWindow,
  };
}

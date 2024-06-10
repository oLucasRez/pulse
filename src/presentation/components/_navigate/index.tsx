import { FC } from 'react';
import { Navigate as DefaultNavigate, useParams } from 'react-router-dom';

import { NavigateToGameProps, NavigateToPlayerProps } from './types';

function replaceIfIsLogout(): boolean {
  return location.pathname === '/logout';
}

const NavigateToHome: FC = () => {
  return <DefaultNavigate to='/' replace={replaceIfIsLogout()} />;
};

const NavigateToGame: FC<NavigateToGameProps> = ({ id, replace }) => {
  const params = useParams();

  return (
    <DefaultNavigate
      to={`/game/${id ?? params.gameID}`}
      replace={replace ?? replaceIfIsLogout()}
    />
  );
};

const NavigateToPlayer: FC<NavigateToPlayerProps> = ({ id }) => {
  const params = useParams();

  return (
    <DefaultNavigate
      to={`/game/${params.gameID}/player${id ? `/${id}` : ''}`}
      replace={replaceIfIsLogout()}
    />
  );
};

const NavigateToLogin: FC = () => {
  return <DefaultNavigate to='/login' replace={replaceIfIsLogout()} />;
};

const NavigateToRegister: FC = () => {
  return <DefaultNavigate to='/register' replace={replaceIfIsLogout()} />;
};

const NavigateToLogout: FC = () => {
  return <DefaultNavigate to='/logout' />;
};

export const Navigate = {
  toHome: NavigateToHome,
  toGame: NavigateToGame,
  toPlayer: NavigateToPlayer,
  toLogin: NavigateToLogin,
  toRegister: NavigateToRegister,
  toLogout: NavigateToLogout,
};

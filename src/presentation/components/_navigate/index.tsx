import { FC } from 'react';
import { Navigate as DefaultNavigate } from 'react-router-dom';

import { NavigateToGameProps } from './types';

function replaceIfIsLogout(): boolean {
  return location.pathname === '/logout';
}

const NavigateToHome: FC = () => {
  return <DefaultNavigate to='/' replace={replaceIfIsLogout()} />;
};

const NavigateToGame: FC<NavigateToGameProps> = (props) => {
  const { id } = props;

  return <DefaultNavigate to={`/game/${id}`} replace={replaceIfIsLogout()} />;
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
  toLogin: NavigateToLogin,
  toRegister: NavigateToRegister,
  toLogout: NavigateToLogout,
};

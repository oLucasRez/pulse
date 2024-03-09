import { FC } from 'react';
import { Link as DefaultLink } from 'react-router-dom';

import { LinkProps, LinkToGameProps } from './types';

function replaceIfIsLogout(): boolean {
  return location.pathname === '/logout';
}

const LinkToHome: FC<LinkProps> = (props) => {
  const { replace } = props;

  return (
    <DefaultLink to='/' {...props} replace={replaceIfIsLogout() || replace} />
  );
};

const LinkToGame: FC<LinkToGameProps> = (props) => {
  const { id, replace } = props;

  return (
    <DefaultLink
      to={`/game/${id}`}
      {...props}
      replace={replaceIfIsLogout() || replace}
    />
  );
};

const LinkToLogin: FC<LinkProps> = (props) => {
  const { replace } = props;

  return (
    <DefaultLink
      to='/login'
      {...props}
      replace={replaceIfIsLogout() || replace}
    />
  );
};

const LinkToRegister: FC<LinkProps> = (props) => {
  const { replace } = props;

  return (
    <DefaultLink
      to='/register'
      {...props}
      replace={replaceIfIsLogout() || replace}
    />
  );
};

const LinkToLogout: FC<LinkProps> = (props) => {
  return <DefaultLink to='/logout' {...props} />;
};

export const Link = {
  toHome: LinkToHome,
  toGame: LinkToGame,
  toLogin: LinkToLogin,
  toRegister: LinkToRegister,
  toLogout: LinkToLogout,
};

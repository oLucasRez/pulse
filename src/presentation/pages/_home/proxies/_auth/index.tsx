import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { authSignals } from '@presentation/signals';

import { useNavigate } from '@presentation/hooks';

import { AuthProxyProps } from './types';

const { me } = authSignals;

export const AuthProxy: FC<AuthProxyProps> = (props) => {
  const { children } = props;

  const { navigateToLoginProps } = useNavigate();

  if (!me.value) return <Navigate {...navigateToLoginProps} />;

  return children;
};

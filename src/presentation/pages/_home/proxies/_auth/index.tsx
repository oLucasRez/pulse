import { FC } from 'react';
import { Navigate } from 'react-router-dom';

import { useNavigate } from '@presentation/hooks';

import { useAuthUsecases } from '@presentation/contexts';

import { AuthProxyProps } from './types';

export const AuthProxy: FC<AuthProxyProps> = (props) => {
  const { children } = props;

  const { navigateToLoginProps } = useNavigate();

  const { me } = useAuthUsecases();

  if (!me) return <Navigate {...navigateToLoginProps} />;

  return children;
};

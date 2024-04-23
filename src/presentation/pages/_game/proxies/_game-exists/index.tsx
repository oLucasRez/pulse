import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { GlobalLoading, Navigate } from '@presentation/components';
import { useGame, useNavigate } from '@presentation/hooks';

import { GameExistsProxyProps } from './types';

export const GameExistsProxy: FC<GameExistsProxyProps> = (props) => {
  const { children } = props;

  const { navigateToLogin } = useNavigate();

  const { games, fetchingGames } = useGame();

  const params = useParams();

  useEffect(() => {
    if (!params.id) navigateToLogin();
  }, []);

  if (fetchingGames) return <GlobalLoading />;

  if (!games.find(({ id }) => id === params.id)) return <Navigate.toHome />;

  return children;
};

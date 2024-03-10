import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { GameModel } from '@domain/models';

import { GlobalLoading, Navigate } from '@presentation/components';
import { useGameUsecases } from '@presentation/contexts';
import { useNavigate, useStates } from '@presentation/hooks';

import { GameExistsProxyProps } from './types';

export const GameExistsProxy: FC<GameExistsProxyProps> = (props) => {
  const { children } = props;

  const [s, set] = useStates({
    game: null as GameModel | null,
    fetchingGame: true,
  });

  const { navigateToLogin } = useNavigate();

  const { fetchGame } = useGameUsecases();

  const params = useParams();

  useEffect(() => {
    if (!params.id) {
      navigateToLogin();
      return;
    }

    fetchGame(params.id)
      .then(set('game'))
      .catch(navigateToLogin)
      .finally(set('fetchingGame', false));
  }, []);

  if (s.fetchingGame) return <GlobalLoading />;

  if (!s.game) return <Navigate.toHome />;

  return children;
};

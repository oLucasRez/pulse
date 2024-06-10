import { FC, useEffect } from 'react';

import { GlobalLoading } from '@presentation/components';
import { useNavigate, usePlayer } from '@presentation/hooks';

import { CreatePlayerProxyProps } from './types';

export const CreatePlayerProxy: FC<CreatePlayerProxyProps> = ({ children }) => {
  const { myPlayer, fetchingPlayers } = usePlayer();

  const { navigateToPlayer } = useNavigate();

  useEffect(() => {
    if (fetchingPlayers || myPlayer) return;

    navigateToPlayer();
  }, [fetchingPlayers, myPlayer]);

  if (fetchingPlayers) return <GlobalLoading />;

  return children;
};

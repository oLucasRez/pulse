import { FC } from 'react';

import { GlobalLoading } from '@presentation/components';
import { usePlayer } from '@presentation/hooks';

import { useMutatePlayerModal } from '../../hooks';

import { CreatePlayerProxyProps } from './types';

export const CreatePlayerProxy: FC<CreatePlayerProxyProps> = (props) => {
  const { children } = props;

  const { myPlayer, fetchingPlayers } = usePlayer();

  const { renderMutatePlayerModal } = useMutatePlayerModal({
    unclosable: true,
    open: true,
  });

  if (fetchingPlayers) return <GlobalLoading />;

  if (myPlayer) return children;

  return renderMutatePlayerModal();
};

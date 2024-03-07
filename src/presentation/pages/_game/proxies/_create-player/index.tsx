import { FC, useEffect } from 'react';

import { playerSignals } from '@presentation/signals';

import { useMutatePlayerModal } from '../../hooks';
import { useStates } from '@presentation/hooks';

import { usePlayerUsecases } from '@presentation/contexts';

import { GlobalLoading } from '@presentation/components';

import { CreatePlayerProxyProps } from './types';

const { myPlayer } = playerSignals;

export const CreatePlayerProxy: FC<CreatePlayerProxyProps> = (props) => {
  const { children } = props;

  const [s, set] = useStates({ fetchingMyPlayer: true });

  const { fetchMyPlayer } = usePlayerUsecases();

  useEffect(() => {
    fetchMyPlayer().finally(set('fetchingMyPlayer', false));
  }, []);

  const { renderMutatePlayerModal } = useMutatePlayerModal({
    unclosable: true,
    open: true,
  });

  if (s.fetchingMyPlayer) return <GlobalLoading />;

  if (myPlayer) return children;

  return renderMutatePlayerModal();
};

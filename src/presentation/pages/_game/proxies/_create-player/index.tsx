import { FC, useEffect } from 'react';

import { PlayerModel } from '@domain/models';

import { GlobalLoading } from '@presentation/components';
import { usePlayerUsecases } from '@presentation/contexts';
import { useStates } from '@presentation/hooks';
import { logError } from '@presentation/utils';

import { useMutatePlayerModal } from '../../hooks';

import { CreatePlayerProxyProps } from './types';

export const CreatePlayerProxy: FC<CreatePlayerProxyProps> = (props) => {
  const { children } = props;

  const [s, set] = useStates({
    fetchingMyPlayer: true,
    myPlayer: null as PlayerModel | null,
  });

  const { fetchMyPlayer } = usePlayerUsecases();

  useEffect(() => {
    fetchMyPlayer()
      .then(set('myPlayer'))
      .catch(logError)
      .finally(set('fetchingMyPlayer', false));
  }, []);

  const { renderMutatePlayerModal } = useMutatePlayerModal({
    unclosable: true,
    open: true,
    onSuccess: set('myPlayer'),
  });

  if (s.fetchingMyPlayer) return <GlobalLoading />;

  if (s.myPlayer) return children;

  return renderMutatePlayerModal();
};
